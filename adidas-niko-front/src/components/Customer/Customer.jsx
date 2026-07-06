import React from "react";
import s from "./Customer.module.sass";
import { FaStar, FaStarHalf, FaCheckCircle } from "react-icons/fa";
import { BsThreeDots } from "react-icons/bs";

const Customer = ({
  name = "Sarah M.",
  text,
  date = "August 14, 2023",
  rating = 5,
}) => {
  const fullStars = Math.floor(rating);
  const hasHalf = rating % 1 !== 0;

  return (
    <article className={s.box}>
      <div className={s.top}>
        <div className={s.stars}>
          {Array.from({ length: fullStars }).map((_, i) => (
            <FaStar key={i} />
          ))}
          {hasHalf && <FaStarHalf />}
        </div>
        <button type="button" className={s.menu} aria-label="Review options">
          <BsThreeDots />
        </button>
      </div>
      <div className={s.review}>
        <div className={s.user}>
          <cite className={s.name}>{name}</cite>
          <FaCheckCircle className={s.icon} aria-label="Verified buyer" />
        </div>
        <q className={s.text}>
          {text ??
            `"I'm blown away by the quality and style of the clothes I received from Shop.co. From casual wear to elegant dresses, every piece I've bought has exceeded my expectations."`}
        </q>
        <p className={s.date}>Posted on {date}</p>
      </div>
    </article>
  );
};

export default Customer;
