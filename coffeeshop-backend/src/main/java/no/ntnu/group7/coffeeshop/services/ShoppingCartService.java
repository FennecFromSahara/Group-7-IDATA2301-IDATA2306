package no.ntnu.group7.coffeeshop.services;

import java.math.BigDecimal;
import java.util.List;

import org.springframework.stereotype.Service;

import jakarta.persistence.EntityManager;
import jakarta.persistence.NoResultException;
import jakarta.persistence.PersistenceContext;
import jakarta.transaction.Transactional;
import no.ntnu.group7.coffeeshop.model.Product;
import no.ntnu.group7.coffeeshop.model.ShoppingCartProduct;
import no.ntnu.group7.coffeeshop.model.User;

/**
 * ShoppingCartService is a service layer class responsible for managing
 * shopping carts in the coffee shop application. It provides functionality to
 * add, remove, and update items in a user's shopping cart, as well as retrieve
 * the items in the shopping cart for a specific user.
 */
@Service
public class ShoppingCartService {

  @PersistenceContext
  private EntityManager entityManager;

  /**
   * Adds a product to the shopping cart of a user with the specified quantity. If
   * the product is already in the cart, it updates the quantity.
   *
   * @param user     the User whose shopping cart the product should be added to
   * @param product  the Product to add to the shopping cart
   * @param quantity the amount of the product to add
   */
  @Transactional
  public void addItemToCart(User user, Product product, int quantity) {
    ShoppingCartProduct cartItem = findCartItem(user, product);

    if (cartItem == null) {
      cartItem = new ShoppingCartProduct();
      cartItem.setUser(user);
      cartItem.setProduct(product);
      cartItem.setQuantity(quantity);

      entityManager.persist(cartItem);
    } else {
      updateCartItemQuantity(cartItem, cartItem.getQuantity() + quantity);
    }
  }

  /**
   * Removes a product from the shopping cart of a user.
   *
   * @param user    the User whose shopping cart the product should be removed
   *                from
   * @param product the Product to remove from the shopping cart
   */
  @Transactional
  public void removeItemFromCart(User user, Product product) {
    ShoppingCartProduct cartItem = findCartItem(user, product);

    if (cartItem != null) {
      entityManager.remove(cartItem);
    }
  }

  /**
   * Updates the quantity of an item in the shopping cart.
   *
   * @param cartItem    the ShoppingCartProduct representing the item to update
   *                    the quantity of
   * @param newQuantity the new quantity for the item
   */
  @Transactional
  public void updateCartItemQuantity(ShoppingCartProduct cartItem, int newQuantity) {
    cartItem.setQuantity(newQuantity);
    entityManager.merge(cartItem);
  }

  /**
   * Retrieves the items in the shopping cart for a specific user.
   *
   * @param user the User to retrieve the items in the shopping cart for
   * @return a List of ShoppingCartProduct objects representing the items in the
   *         user's shopping cart
   */
  public List<ShoppingCartProduct> getCartProducts(User user) {
    return entityManager
        .createQuery("SELECT c FROM ShoppingCartProduct c WHERE c.user = :user", ShoppingCartProduct.class)
        .setParameter("user", user)
        .getResultList();
  }

  /**
   * Retrieves an existing product in a user's shopping cart.
   *
   * @param user    the User whose shopping cart to look for the product in
   * @param product the Product to find in the user's shopping cart
   * @return the ShoppingCartProduct representing the product in the user's
   *         shopping cart, or null if not found
   */
  private ShoppingCartProduct findCartItem(User user, Product product) {
    try {
      return entityManager
          .createQuery("SELECT c FROM ShoppingCartProduct c WHERE c.user = :user AND c.product = :product",
              ShoppingCartProduct.class)
          .setParameter("user", user)
          .setParameter("product", product)
          .getSingleResult();
    } catch (NoResultException e) {
      return null;
    }
  }

  /**
   * Calculates the total price of all items in a user's shopping cart.
   *
   * @param user the user whose shopping cart total should be calculated
   * @return the total price of all items in the user's shopping cart as a
   *         BigDecimal
   */
  public BigDecimal calculateShoppingCartTotal(User user) {
    List<ShoppingCartProduct> cartItems = getCartProducts(user);

    BigDecimal total = BigDecimal.ZERO;

    for (ShoppingCartProduct cartItem : cartItems) {
      BigDecimal itemTotal = cartItem.getProduct().getPrice().multiply(new BigDecimal(cartItem.getQuantity()));
      total = total.add(itemTotal);
    }

    return total;
  }

  /**
   * Clears the shopping cart for a given user by removing all items.
   *
   * @param user the user whose shopping cart should be cleared
   */
  public void clearShoppingCart(User user) {
    List<ShoppingCartProduct> cartProducts = getCartProducts(user);

    for (ShoppingCartProduct cartProduct : cartProducts) {
      removeItemFromCart(user, cartProduct.getProduct());
    }
  }
}
