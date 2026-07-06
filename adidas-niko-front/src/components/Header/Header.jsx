import React, { useEffect, useState } from "react";
import s from "./Header.module.sass";
import Container from "../Container/Container";
import { Link, NavLink } from "react-router";
import { LuShoppingCart } from "react-icons/lu";
import { CgProfile } from "react-icons/cg";
import { IoSearchOutline } from "react-icons/io5";
import { getCart } from "../../api/cart";

const Header = () => {
  const [cartCount, setCartCount] = useState(0);

  const loadCart = () => {
    getCart()
      .then((items) => {
        const count = items.reduce((sum, item) => sum + item.quantity, 0);
        setCartCount(count);
      })
      .catch(() => setCartCount(0));
  };

  useEffect(() => {
    loadCart();
    window.addEventListener("cart-updated", loadCart);
    return () => window.removeEventListener("cart-updated", loadCart);
  }, []);

  return (
    <div className={s.header}>
      <Container>
        <div className={s.wrap}>
          <NavLink to="/" className={s.logo}>
            Shop.co
          </NavLink>
          <nav className={s.nav}>
            <NavLink to="#">Shop </NavLink>
            <NavLink to="#">On Sale</NavLink>
            <NavLink to="#">New Arrivals</NavLink>
            <NavLink to="#">Brands</NavLink>
          </nav>
          <form className={s.form}>
            <input type="search" />
            <div className={s.search}>
              <IoSearchOutline className={s.search_icon} />
              <span>Search for products...</span>
            </div>
          </form>
          <div className={s.other}>
            <Link to="/cart" className={s.icon}>
              <LuShoppingCart />
              {cartCount > 0 && <span className={s.badge}>{cartCount}</span>}
            </Link>
            <div className={s.icon}>
              <CgProfile />
            </div>
          </div>
        </div>
      </Container>
    </div>
  );
};

export default Header;
