import React, { useEffect, useState } from "react";
import s from "./Recommendation.module.sass";
import Container from "../Container/Container";
import Heading from "../Heading/Heading";
import ProductCard from "../ProductCard/ProductCard";
import { getProducts } from "../../api/products";
import { useParams } from "react-router";

const Recommendation = () => {
  const { id } = useParams();
  const [products, setProducts] = useState([]);

  useEffect(() => {
    getProducts()
      .then((data) => {
        const others = data.filter((product) => String(product.id) !== id);
        setProducts(others.slice(0, 4));
      })
      .catch(() => setProducts([]));
  }, [id]);

  if (!products.length) return null;

  return (
    <div className={s.recommendation}>
      <Container>
        <div className={s.wrap}>
          <Heading title="You might also like" />
          <div className={s.cards}>
            {products.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        </div>
      </Container>
    </div>
  );
};

export default Recommendation;
