import { asyncApiRequest } from "../tools/requests";

export async function getProducts() {
  return await asyncApiRequest("GET", "/products");
}

export async function getUsers() {
  return await asyncApiRequest("GET", "/users");
}

export async function getOrders() {
  return await asyncApiRequest("GET", "/orders");
}

export async function getShoppingCart() {
  return await asyncApiRequest("GET", "/shoppingCart");
}

export async function getProductById(id) {
  return await asyncApiRequest("GET", "/products/" + id);
}

export async function getCategories() {
  return await asyncApiRequest("GET", "/categories");
}

export async function getProfileData(username) {
  return await asyncApiRequest("GET", "/users/" + username);
}
