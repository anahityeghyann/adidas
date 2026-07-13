import { apiRequest, mediaUrl } from "./client";

export function getProducts() {
  return apiRequest("/products/");
}

export function getProduct(id) {
  return apiRequest(`/products/${id}/`);
}

export function getProductImage(product) {
  const mainImage = product.images?.find((img) => img.is_main);
  const firstImage = product.images?.[0];
  const imagePath = mainImage?.image || firstImage?.image;
  return imagePath ? mediaUrl(imagePath) : null;
}

export function getDiscountPercent(price, salePrice) {
  if (!salePrice || Number(price) <= 0) return null;
  const discount = Math.round((1 - Number(salePrice) / Number(price)) * 100);
  return discount > 0 ? discount : null;
}


export function formatReviewDate(isoDate){
  if (!isoDate) return ""
  return new Date(isoDate).toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric"
  })
}

export function getStarParts(rating){
  const value = Number(rating) || 0
  const full = Math.floor(value)
  const fraction = value - full
  if(fraction >= 0.75){
    return {full: full + 1, hasHalf: false}
  }
  if (fraction >= 0.25){
    return {full, hasHalf: true}
  }
  return {full, hasHalf: false}
}
