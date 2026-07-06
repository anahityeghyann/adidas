import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router";
import s from "./ProductDetails.module.sass";
import Container from "../Container/Container";
import fallbackImg from "../../assets/img/card_img_ex.png";
import Heading from "../Heading/Heading";
import { FaStar, FaStarHalf } from "react-icons/fa";
import { BsCheck2 } from "react-icons/bs";
import { TbMinus, TbPlus } from "react-icons/tb";
import { mediaUrl } from "../../api/client";
import {
  getProduct,
  getProductImage,
  getDiscountPercent,
} from "../../api/products";
import { addToCart } from "../../api/cart";

const breadcrumbs = [
  { label: "Home", to: "/" },
  { label: "Shop", to: "/" },
];

const ProductDetails = () => {
  const { id } = useParams();
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [activeImage, setActiveImage] = useState(0);
  const [activeColor, setActiveColor] = useState(0);
  const [activeSize, setActiveSize] = useState(0);
  const [quantity, setQuantity] = useState(1);
  const [cartMessage, setCartMessage] = useState("");

  useEffect(() => {
    setLoading(true);
    setError(null);
    getProduct(id)
      .then((data) => {
        setProduct(data);
        setActiveImage(0);
        setActiveColor(0);
        setActiveSize(0);
      })
      .catch(() => setError("Product not found."))
      .finally(() => setLoading(false));
  }, [id]);

  const handleAddToCart = async () => {
    if (!product) return;
    try {
      for (let i = 0; i < quantity; i += 1) {
        await addToCart(product.id);
      }
      setCartMessage("Added to cart");
      window.dispatchEvent(new Event("cart-updated"));
    } catch {
      setCartMessage("Could not add to cart");
    }
  };

  if (loading) {
    return (
      <div className={s.productDetails}>
        <Container>
          <p>Loading product...</p>
        </Container>
      </div>
    );
  }

  if (error || !product) {
    return (
      <div className={s.productDetails}>
        <Container>
          <p>{error}</p>
        </Container>
      </div>
    );
  }

  const galleryImages =
    product.images?.length > 0
      ? product.images.map((img) => mediaUrl(img.image) || fallbackImg)
      : [getProductImage(product) || fallbackImg];

  const colors = product.colors?.length
    ? product.colors
    : [{ hex: "#4F4631" }, { hex: "#31344F" }, { hex: "#314F4A" }];

  const sizes = product.sizes?.length
    ? product.sizes.map((size) => size.name)
    : ["Small", "Medium", "Large", "X-Large"];

  const currentPrice = product.current_price ?? product.price;
  const discount = getDiscountPercent(product.price, product.sale_price);
  const hasSale = product.sale_price != null;

  return (
    <div className={s.productDetails}>
      <Container>
        <nav className={s.breadcrumbs} aria-label="Breadcrumb">
          {[...breadcrumbs, { label: product.name, to: null }].map(
            (item, index) => (
              <span key={item.label} className={s.breadcrumbItem}>
                {index > 0 && <span className={s.breadcrumbSep}>&gt;</span>}
                {item.to ? (
                  <Link to={item.to}>{item.label}</Link>
                ) : (
                  <span>{item.label}</span>
                )}
              </span>
            )
          )}
        </nav>

        <div className={s.wrap}>
          <div className={s.gallery}>
            <div className={s.thumbs}>
              {galleryImages.map((img, index) => (
                <button
                  key={index}
                  type="button"
                  className={`${s.thumb} ${
                    index === activeImage ? s.activeThumb : ""
                  }`}
                  onClick={() => setActiveImage(index)}
                  aria-label={`View image ${index + 1}`}
                  aria-current={index === activeImage ? "true" : undefined}
                >
                  <img src={img} alt="" />
                </button>
              ))}
            </div>
            <div className={s.mainImage}>
              <img src={galleryImages[activeImage]} alt={product.name} />
            </div>
          </div>

          <div className={s.rightPart}>
            <Heading align="left" title={product.name} />
            <div className={s.rating}>
              <div className={s.stars}>
                <FaStar />
                <FaStar />
                <FaStar />
                <FaStar />
                <FaStarHalf />
              </div>
              <div className={s.ratingNumber}>
                <span className={s.currentRating}>4.5</span>/
                <span className={s.max}>5</span>
              </div>
            </div>
            <div className={s.price}>
              <div className={s.newPrice}>
                ${Number(currentPrice).toFixed(0)}
              </div>
              {hasSale && (
                <del className={s.oldPrice}>
                  ${Number(product.price).toFixed(0)}
                </del>
              )}
              {discount != null && (
                <div className={s.discount}>-{discount}%</div>
              )}
            </div>
            <p className={s.desc}>{product.description}</p>
            <hr className={s.hr} />
            <div className={s.prop}>
              <div className={s.propName}>Select Colors</div>
              <div className={s.selectColor}>
                {colors.map((color, index) => (
                  <div
                    key={color.id ?? color.hex}
                    onClick={() => setActiveColor(index)}
                    className={s.color}
                    style={{ backgroundColor: color.hex || "#ccc" }}
                  >
                    {index === activeColor && <BsCheck2 />}
                  </div>
                ))}
              </div>
            </div>
            <hr className={s.hr} />
            <div className={s.prop}>
              <div className={s.propName}>Choose Size</div>
              <div className={s.selectSize}>
                {sizes.map((size, index) => (
                  <div
                    key={size}
                    onClick={() => setActiveSize(index)}
                    className={`${s.size} ${
                      index === activeSize ? s.activeSize : ""
                    }`}
                  >
                    {size}
                  </div>
                ))}
              </div>
            </div>
            <div className={s.lastPart}>
              <div className={s.count}>
                <button
                  type="button"
                  className={s.change}
                  onClick={() => setQuantity((q) => Math.max(1, q - 1))}
                >
                  <TbMinus />
                </button>
                <div className={s.number}>{quantity}</div>
                <button
                  type="button"
                  className={s.change}
                  onClick={() => setQuantity((q) => q + 1)}
                >
                  <TbPlus />
                </button>
              </div>
              <button
                type="button"
                className={s.addToCart}
                onClick={handleAddToCart}
              >
                Add to Cart
              </button>
            </div>
            {cartMessage && <p>{cartMessage}</p>}
          </div>
        </div>
      </Container>
    </div>
  );
};

export default ProductDetails;
