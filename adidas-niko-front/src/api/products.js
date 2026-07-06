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
