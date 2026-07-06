import React, { useCallback, useEffect, useMemo, useState } from "react";
import s from "./CardSummary.module.sass";
import Heading from "../Heading/Heading";
import fallbackImg from "../../assets/img/card_img_ex.png";
import { RiDeleteBin6Fill } from "react-icons/ri";
import { LuMinus, LuPlus, LuTag } from "react-icons/lu";
import { FaArrowRight } from "react-icons/fa";
import Container from "../Container/Container";
import { getProductImage } from "../../api/products";
import { Link } from "react-router";
import { getCart, notifyCartUpdated, removeFromCart, updateCartItem } from "../../api/cart";

const DELIVERY_FEE = 15;
const PROMO_CODES = {
  SALE20: 0.2,
};

const formatPrice = (value) => `$${Number(value).toFixed(2)}`;

const CartLineItem = ({ item, onQuantityChange, onRemove, updating }) => {
  const { product, quantity } = item;
  const imageSrc = getProductImage(product) || fallbackImg;
  const unitPrice = product.current_price ?? product.price;
  const lineTotal = Number(unitPrice) * quantity;
  
  return (
    <div className={s.card}>
      <Link to={`/product/${product.id}`} className={s.img}>
        <img src={imageSrc} alt="" />
      </Link>
      <div className={s.info}>
        <div className={s.title}>{product.name}</div>
        <div className={s.unitPrice}>{formatPrice(unitPrice)} each</div>
        <div className={s.price}>{formatPrice(lineTotal)}</div>
      </div>
      <button
        className={s.remove}
        onClick={() => onRemove(product.id)}
        disabled={updating}
      >
        <RiDeleteBin6Fill />
      </button>
      <div className={s.quantity}>
        <button
          className={s.btn}
          disabled={updating || quantity <= 1} // Prevent negative or zero quantities
          onClick={() => onQuantityChange(product.id, quantity - 1)}
        >
          <LuMinus />
        </button>
        <div className={s.count}>{quantity}</div>
        <button
          className={s.btn}
          disabled={updating}
          onClick={() => onQuantityChange(product.id, quantity + 1)}
        >
          <LuPlus />
        </button>
      </div>
    </div>
  );
};

const CardSummary = () => {
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [updatingId, setUpdatingId] = useState(null);
  const [promoCode, setPromoCode] = useState("");
  const [appliedPromo, setAppliedPromo] = useState(null);
  const [promoMessage, setPromoMessage] = useState("");
  const [checkOutMessage, setCheckOutMessage] = useState("");

  const loadCart = useCallback(() => {
    setLoading(true);
    setError(null);
    getCart()
      .then(setItems)
      .catch(() => setError("Could not load your cart."))
      .finally(() => setLoading(false));
  }, []); // Added dependency array to useCallback

  useEffect(() => {
    loadCart();
    window.addEventListener("cart-updated", loadCart);
    return () => window.removeEventListener("cart-updated", loadCart);
  }, [loadCart]);

  const summary = useMemo(() => {
    let subtotal = 0;
    let saleSavings = 0;

    items.forEach((item) => {
      const price = Number(item.product.price);
      const currentPrice = Number(item.product.current_price ?? item.product.price);
      const qty = item.quantity;

      subtotal += currentPrice * qty;
      if (item.product.sale_price != null && currentPrice < price) {
        saleSavings += (price - currentPrice) * qty;
      }
    });

    const promoDiscount = appliedPromo ? subtotal * appliedPromo : 0;
    const deliveryFee = items.length > 0 ? DELIVERY_FEE : 0;
    const total = Math.max(subtotal - promoDiscount + deliveryFee, 0);

    return { subtotal, saleSavings, promoDiscount, deliveryFee, total };
  }, [items, appliedPromo]);

  const handleQuantityChange = async (productId, quantity) => {
    if (quantity < 1) return; // Fail-safe
    setUpdatingId(productId);
    try {
      await updateCartItem(productId, quantity);
      notifyCartUpdated();
    } catch {
      setError("Could not update quantity");
    } finally {
      setUpdatingId(null);
    }
  };

  const handleRemove = async (productId) => {
    setUpdatingId(productId);
    try {
      await removeFromCart(productId);
      notifyCartUpdated();
    } catch {
      setError("Could not remove item");
    } finally {
      setUpdatingId(null);
    }
  };

  const handlePromoSubmit = (event) => {
    event.preventDefault();
    const code = promoCode.trim().toUpperCase();
    const discount = PROMO_CODES[code];

    if (!discount) {
      setAppliedPromo(null);
      setPromoMessage("Invalid promo code");
      return;
    }

    setAppliedPromo(discount);
    setPromoMessage(`Promo code "${code}" applied.`);
  };

  const handleCheckOut = () => {
    if (!items.length) return;
    setCheckOutMessage("Checkout is not available yet");
  };

  return (
    <div className={s.cardSummary}>
      <Container>
        <div className={s.wrap}>
          <Heading align="left" title="Your Cart" />
          {loading && <p className={s.message}>Loading cart...</p>}
          {error && <p className={s.error}>{error}</p>}

          {!loading && !error && items.length === 0 && (
            <div className={s.empty}>
              <p>Your cart is empty</p>
              <Link to="/" className={s.shopLink}>
                Continue Shopping
              </Link>
            </div>
          )}
          {!loading && !error && items.length > 0 && (
            <div className={s.body}>
              <div className={s.leftPart}>
                {items.map((item) => (
                  <CartLineItem
                    key={item.product.id}
                    item={item}
                    onQuantityChange={handleQuantityChange}
                    onRemove={handleRemove}
                    updating={updatingId === item.product.id}
                  />
                ))}
              </div>
              <div className={s.rightPart}>
                <h4 className={s.heading}>Order Summary</h4>
                <div className={s.cartList}>
                  <div className={s.position}>
                    <div className={s.left}>Subtotal</div>
                    {/* FIXED: changed summary.subTotal to summary.subtotal */}
                    <div className={s.right}>{formatPrice(summary.subtotal)}</div>
                  </div>
                  {summary.saleSavings > 0 && (
                    <div className={s.position}>
                      <div className={s.left}>Sale savings</div>
                      <div className={`${s.right} ${s.discount}`}>-{formatPrice(summary.saleSavings)}</div>
                    </div>
                  )}
                  {summary.promoDiscount > 0 && (
                    <div className={s.position}>
                      <div className={s.left}>Promo Discount</div>
                      <div className={`${s.right} ${s.discount}`}>-{formatPrice(summary.promoDiscount)}</div>
                    </div>
                  )}
                  <div className={s.position}>
                    <div className={s.left}>Delivery Fee</div>
                    <div className={s.right}>{formatPrice(summary.deliveryFee)}</div>
                  </div>
                </div>
                <hr className={s.hr} />
                <div className={s.total}>
                  <div className={s.left}>Total</div>
                  <div className={s.right}>{formatPrice(summary.total)}</div>
                </div>
                <form className={s.form} onSubmit={handlePromoSubmit}>
                  <div className={s.input}>
                    <input type="text" value={promoCode} onChange={(event) => setPromoCode(event.target.value)} />
                    <div className={s.placeholder}>
                      <LuTag className={s.icon} />
                      <span>Add promo code</span>
                    </div>
                  </div>
                  <button className={s.apply} type="submit">
                    Apply
                  </button>
                </form>
                {promoMessage && <p className={s.message}>{promoMessage}</p>}
                <button className={s.checkoutBtn} onClick={handleCheckOut}>
                  Go to Checkout <FaArrowRight />
                </button>
                {checkOutMessage && <p className={s.message}>{checkOutMessage}</p>}
              </div>
            </div>
          )}
        </div>
      </Container>
    </div>
  );
};

export default CardSummary;