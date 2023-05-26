import { asyncApiRequest } from "./requests";

export async function addToCart(user, product) {
  if (!user) {
    alert("Please log in to add items to the cart.");
    return;
  }

  try {
    const requestBody = {
      userId: user.id,
      productId: product.id,
      quantity: 1,
    };
    await asyncApiRequest("POST", "/shoppingCart/add-to-cart", requestBody, true);
    alert("Product added to cart successfully.");
  } catch (error) {
    alert("Error adding product to cart.");
    console.error(error);
  }
}
