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
