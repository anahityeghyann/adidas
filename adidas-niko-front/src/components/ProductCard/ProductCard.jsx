import React from "react";
import s from "./ProductCard.module.sass";
import fallbackImg from "../../assets/img/card_img_ex.png";
import { FaStarHalf } from "react-icons/fa";
import { FaStar } from "react-icons/fa";
import { Link } from "react-router";
import {
  getProductImage,
  getDiscountPercent,
  getStarParts,
} from "../../api/products";

const ProductCard = ({ product }) => {
  if (!product) return null;

  const imageSrc = getProductImage(product) || fallbackImg;
  const hasSale = product.sale_price != null;
  const currentPrice = product.current_price ?? product.price;
  const discount = getDiscountPercent(product.price, product.sale_price);
  const averageRating = product.average_rating;
  const { full, hasHalf } = getStarParts(averageRating ?? 0);

  return (
    <Link to={`/product/${product.id}`} className={s.product_card}>
      <div className={s.img_wrap}>
        <img src={imageSrc} alt={product.name} />
      </div>
      <div className={s.under}>
        <p className={s.text}>{product.name}</p>

        {averageRating != null &&
        (
          <div className={s.rating}>
            <div className={s.stars}>
              {Array.from({ length: full }).map((_, i) => (
                <FaStar key={i} />
              ))}
              {hasHalf && <FaStarHalf />}
            </div>
            <div className={s.ratingNumber}>
              <span className={s.currentRating}>{averageRating}</span>/
              <span className={s.max}>5</span>
            </div>
          </div>
        )}
        <div className={s.sale}>
          <div className={s.price}>${Number(currentPrice).toFixed(0)}</div>
          {hasSale && (
            <div className={s.old_price}>
              ${Number(product.price).toFixed(0)}
            </div>
          )}
          {discount != null && <div className={s.discount}>-{discount}%</div>}
        </div>
      </div>
    </Link>
  );
};

export default ProductCard;
