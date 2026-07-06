import { apiRequest } from "./client";

export function getCart() {
  return apiRequest("/cart/");
}

export function addToCart(productId) {
  return apiRequest("/cart/add/", {
    method: "POST",
    body: JSON.stringify({ product_id: productId }),
  });
}

export function removeFromCart(productId) {
  return apiRequest("/cart/remove/", {
    method: "POST",
    body: JSON.stringify({ product_id: productId }),
  });
}

export function updateCartItem(productId, quantity){
  return apiRequest("/cart/update/", {
    method: "POST",
    body:JSON.stringify({product_id: productId, quantity})
  })
}

export function notifyCartUpdated(){
  window.dispatchEvent(new Event("cart-updated"))
}