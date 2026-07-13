import React, { useState } from "react";
import s from "./AllReviews.module.sass";
import Container from "../Container/Container";
import Button from "../Button/Button";
import Customer from "../Customer/Customer";
import { IoChevronDownOutline, IoFilter } from "react-icons/io5";
import { formatReviewDate } from "../../api/products";

const tabs = ["Product Details", "Rating & Reviews", "FAQ"];

const faqItems = [
  {
    question: "What materials is this t-shirt made from?",
    answer:
      "This t-shirt is crafted from a soft, breathable cotton blend designed for everyday comfort and durability.",
  },
  {
    question: "How should I care for this product?",
    answer:
      "Machine wash cold with like colors. Tumble dry low or hang dry. Do not bleach or iron directly on the print.",
  },
  {
    question: "What is your return policy?",
    answer:
      "We offer a 30-day return policy on unworn items with original tags attached. Contact support to start a return.",
  },
  {
    question: "How long does delivery take?",
    answer:
      "Standard delivery takes 3–5 business days. Express shipping is available at checkout for 1–2 business day delivery.",
  },
];

const AllReviews = ({ product }) => {
  const [activeTab, setActiveTab] = useState(1);
  const [openFaq, setOpenFaq] = useState(0);

  const reviews = product?.reviews ?? [];
  const reviewCount = product?.review_count ?? reviews.length;

  return (
    <div className={s.allReviews}>
      <Container>
        <div className={s.wrap}>
          <div className={s.tabs}>
            {tabs.map((tab, index) => (
              <button
                key={tab}
                type="button"
                onClick={() => setActiveTab(index)}
                className={`${s.tab} ${activeTab === index ? s.active : ""}`}
              >
                {tab}
              </button>
            ))}
          </div>

          {activeTab === 0 && (
            <div className={s.panel}>
              <div className={s.detailsGrid}>
                <div className={s.detailBlock}>
                  <h4 className={s.detailLabel}>Description</h4>
                  <p className={s.detailText}>
                    {product?.description || "No description available."}
                  </p>
                </div>
                <div className={s.detailBlock}>
                  <h4 className={s.detailLabel}>Fabric & Care</h4>
                  <ul className={s.detailList}>
                    <li>100% premium cotton blend</li>
                    <li>Lightweight and breathable</li>
                    <li>Machine wash cold, tumble dry low</li>
                    <li>Do not bleach; iron inside out on low heat</li>
                  </ul>
                </div>
                <div className={s.detailBlock}>
                  <h4 className={s.detailLabel}>Fit & Sizing</h4>
                  <ul className={s.detailList}>
                    <li>Regular fit with slight stretch</li>
                    <li>True to size — order your usual size</li>
                    <li>Model is 6&apos;1&quot; and wears size Large</li>
                  </ul>
                </div>
              </div>
            </div>
          )}

          {activeTab === 1 && (
            <div className={s.panel}>
              <div className={s.tools}>
                <div className={s.heading}>
                  <h3 className={s.title}>All Reviews</h3>
                  <div className={s.count}>({reviewCount})</div>
                </div>
                <div className={s.btn_group}>
                  <button
                    type="button"
                    className={s.filter}
                    aria-label="Filter reviews"
                  >
                    <IoFilter />
                  </button>
                  <button type="button" className={s.latest}>
                    <span>Latest</span>
                    <IoChevronDownOutline />
                  </button>
                  <button type="button" className={s.write}>
                    Write a Review
                  </button>
                </div>
              </div>
              {reviews.length === 0 ? (
                <p>No reviews yet for this product.</p>
              ) : (
                <div className={s.reviews}>
                  {reviews.map((review) => (
                    <Customer
                      key={review.id}
                      name={review.name}
                      text={review.description}
                      date={formatReviewDate(review.posted_date)}
                      rating={review.rating}
                    />
                  ))}
                </div>
              )}
            </div>
          )}

          {activeTab === 2 && (
            <div className={s.panel}>
              <div className={s.faqList}>
                {faqItems.map((item, index) => (
                  <div key={item.question} className={s.faqItem}>
                    <button
                      type="button"
                      className={`${s.faqQuestion} ${
                        openFaq === index ? s.faqOpen : ""
                      }`}
                      onClick={() => setOpenFaq(openFaq === index ? -1 : index)}
                      aria-expanded={openFaq === index}
                    >
                      <span>{item.question}</span>
                      <IoChevronDownOutline className={s.faqIcon} />
                    </button>
                    {openFaq === index && (
                      <p className={s.faqAnswer}>{item.answer}</p>
                    )}
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </Container>
    </div>
  );
};

export default AllReviews;
