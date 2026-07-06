import React, { useState } from "react";
import s from "./AllReviews.module.sass";
import Container from "../Container/Container";
import Button from "../Button/Button";
import Customer from "../Customer/Customer";
import { IoChevronDownOutline, IoFilter } from "react-icons/io5";

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

const reviews = [
  {
    name: "Samantha D.",
    text: '"I absolutely love this t-shirt! The design is unique and the fabric feels so comfortable. As a fellow designer, I appreciate the attention to detail. It\'s become my favorite go-to shirt."',
    date: "August 14, 2023",
    rating: 5,
  },
  {
    name: "Alex M.",
    text: '"The customer experience was exceptional. The shirt exceeded my expectations in terms of quality and fit. I\'ve already recommended this to several friends."',
    date: "August 12, 2023",
    rating: 5,
  },
  {
    name: "Ethan R.",
    text: '"This t-shirt is a must-have for anyone who appreciates good design. The minimalistic yet stylish pattern caught my eye, and the fit is perfect. I can see the designer\'s touch in every aspect."',
    date: "August 10, 2023",
    rating: 4.5,
  },
  {
    name: "Olivia P.",
    text: '"As a UI/UX enthusiast, I value simplicity and functionality. This t-shirt not only represents those principles but also feels great to wear. It\'s evident that the designer poured their creativity into it."',
    date: "August 8, 2023",
    rating: 5,
  },
  {
    name: "Daniel S.",
    text: '"The t-shirt exceeded my expectations in every way. The fabric is soft, the fit is perfect, and the color is vibrant. I\'ve received so many compliments already."',
    date: "August 5, 2023",
    rating: 4.5,
  },
  {
    name: "Maya L.",
    text: '"Finally found a graphic tee that doesn\'t feel cheap. Great quality print and the olive color is exactly as shown. Will definitely order more colors."',
    date: "August 3, 2023",
    rating: 5,
  },
];

const AllReviews = () => {
  const [activeTab, setActiveTab] = useState(1);
  const [openFaq, setOpenFaq] = useState(0);

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
                    This graphic t-shirt is perfect for any occasion. Crafted from a
                    soft and breathable fabric, it offers superior comfort and style
                    with a relaxed fit that works for casual and layered looks.
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
                  <div className={s.count}>(451)</div>
                </div>
                <div className={s.btn_group}>
                  <button type="button" className={s.filter} aria-label="Filter reviews">
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
              <div className={s.reviews}>
                {reviews.map((review) => (
                  <Customer key={review.name + review.date} {...review} />
                ))}
              </div>
              <Button text="Load More Reviews" />
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
