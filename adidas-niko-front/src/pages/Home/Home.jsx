import React, { useEffect, useState } from "react";
import Customer from "../../components/Customer/Customer";
import Hero from "../../components/Hero/Hero";
import ProductCard from "../../components/ProductCard/ProductCard";
import Wrap from "../../components/Wrap/Wrap";
import { getProducts } from "../../api/products";

const Home = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    getProducts()
      .then(setProducts)
      .catch(() => setError("Could not load products. Is the backend running?"))
      .finally(() => setLoading(false));
  }, []);

  const newArrivals = products.slice(0, 4);
  const topSelling = products.slice(4, 8).length
    ? products.slice(4, 8)
    : products.slice(0, 4);

  return (
    <>
      <Hero />
      <Wrap heading="New Arrivals" button="View All">
        {loading && <p>Loading products...</p>}
        {error && <p>{error}</p>}
        {!loading &&
          !error &&
          newArrivals.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
      </Wrap>
      <Wrap heading="Top Selling" button="View All">
        {!loading &&
          !error &&
          topSelling.map((product) => (
            <ProductCard key={`top-${product.id}`} product={product} />
          ))}
      </Wrap>
      <Wrap heading="Happy Customers" button="View All">
        <Customer />
        <Customer />
        <Customer />
      </Wrap>
    </>
  );
};

export default Home;
