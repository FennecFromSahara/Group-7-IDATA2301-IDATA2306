import { asyncApiRequest } from "../tools/requests";

// GET
export async function getProducts() {
  return await asyncApiRequest("GET", "/products");
}

export async function getUsers() {
  return await asyncApiRequest("GET", "/users");
}

export async function getOrders() {
  return await asyncApiRequest("GET", "/orders");
}

export async function getCategories() {
  return await asyncApiRequest("GET", "/categories");
}

export async function getShoppingCart() {
  return await asyncApiRequest("GET", "/shoppingCart");
}

export async function getProductById(id) {
  return await asyncApiRequest("GET", "/products/" + id);
}

export async function getShoppingCartTotal() {
  return await asyncApiRequest("GET", "/shoppingCart/total");
}

export async function getProfileData(username) {
  return await asyncApiRequest("GET", "/users/" + username);
}

export async function getProductsCount() {
  return await asyncApiRequest("GET", "/products/count");
}

// POST
export async function addToCartRequest(requestBody) {
  return await asyncApiRequest(
    "POST",
    "/shoppingCart/add-to-cart",
    requestBody,
    true
  );
}

export async function postCheckout() {
  return await asyncApiRequest("POST", "/checkout");
}

export async function patchShoppingCartProductQuantity(requestBody) {
  return await asyncApiRequest(
    "PATCH",
    "/shoppingCart/quantity",
    requestBody,
    true
  );
}

export async function deleteProductFromShoppingCartRequest(productId) {
  return await asyncApiRequest("DELETE", "/shoppingCart/" + productId);
}
