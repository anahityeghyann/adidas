import React from "react";
import s from "./ProductCard.module.sass";
import fallbackImg from "../../assets/img/card_img_ex.png";
import { FaStarHalf } from "react-icons/fa";
import { FaStar } from "react-icons/fa";
import { Link } from "react-router";
import { getProductImage, getDiscountPercent } from "../../api/products";

const ProductCard = ({ product }) => {
  if (!product) return null;

  const imageSrc = getProductImage(product) || fallbackImg;
  const hasSale = product.sale_price != null;
  const currentPrice = product.current_price ?? product.price;
  const discount = getDiscountPercent(product.price, product.sale_price);

  return (
    <Link to={`/product/${product.id}`} className={s.product_card}>
      <div className={s.img_wrap}>
        <img src={imageSrc} alt={product.name} />
      </div>
      <div className={s.under}>
        <p className={s.text}>{product.name}</p>

        <div className={s.rating}>
          <div className={s.stars}>
            <FaStar />
            <FaStar />
            <FaStar />
            <FaStar />
            <FaStarHalf />
          </div>
          <div className={s.score}>4.5/5</div>
        </div>

        <div className={s.sale}>
          <div className={s.price}>${Number(currentPrice).toFixed(0)}</div>
          {hasSale && (
            <div className={s.old_price}>${Number(product.price).toFixed(0)}</div>
          )}
          {discount != null && (
            <div className={s.discount}>-{discount}%</div>
          )}
        </div>
      </div>
    </Link>
  );
};

export default ProductCard;
