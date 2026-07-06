import React from "react";
import s from "./ClothStyle.module.sass";
import ProductCard from "../ProductCard/ProductCard";
import { FaArrowLeft, FaArrowRight } from "react-icons/fa";
import Container from "../Container/Container";

// {[1, 2, 3, "...", 8,9,10].map((num,index)=>)}onClick={()=> typeof num === "number" && setActivePage(num)}

const ClothStyle = () => {
  return (
    <div className={s.clothStyle}>
      <Container>
        <div className={s.wrap}>
          <div className={s.upperPart}>
            <div className={s.heading}>Casual</div>
            <div className={s.show}>
              <p className={s.showing}>Showing 1-10 od 100 products</p>
              <div className={s.sorting}>
                Sort by: <b>Most Popular</b>
              </div>
            </div>
          </div>
          <div className={s.midPart}>
            <ProductCard />
            <ProductCard />
            <ProductCard />
            <ProductCard />
            <ProductCard />
            <ProductCard />
            <ProductCard />
            <ProductCard />
            <ProductCard />
          </div>
          <hr className={s.hr} />
          <div className={s.bottomPart}>
            <div className={s.perAndNex}>
              <button className={s.changePage}>
                <FaArrowLeft /> Previous
              </button>
            </div>
            <div className={s.pages}>
              <button
                onClick={() => typeof num === "number" && setActivePage(num)}
                className={s.pageNum}
              >
                1
              </button>
              <button className={s.pageNum}>2</button>
              <button className={s.pageNum}>3</button>
              <button className={s.pageNum}>...</button>
              <button className={s.pageNum}>8</button>
              <button className={s.pageNum}>9</button>
              <button className={s.pageNum}>10</button>
            </div>
            <div className={s.perAndNex}>
              <button className={s.changePage}>
                Next <FaArrowRight />
              </button>
            </div>
          </div>
        </div>
      </Container>
    </div>
  );
};

export default ClothStyle;
