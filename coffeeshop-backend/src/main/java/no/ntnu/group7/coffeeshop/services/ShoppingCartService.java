package no.ntnu.group7.coffeeshop.services;

import java.util.List;

import jakarta.persistence.EntityManager;
import jakarta.persistence.NoResultException;
import jakarta.persistence.PersistenceContext;
import jakarta.transaction.Transactional;
import no.ntnu.group7.coffeeshop.model.Product;
import no.ntnu.group7.coffeeshop.model.ShoppingCartProduct;
import no.ntnu.group7.coffeeshop.model.User;

public class ShoppingCartService {

  @PersistenceContext
  private EntityManager entityManager;

  /**
   * Adds a product to the shopping cart of a user with the specified quantity. If
   * the product is already in the cart, it updates the quantity
   * 
   * @param user     user to add item to
   * @param product  product to add to cart
   * @param quantity amount of items to add
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
   * Removes a product from the shopping cart of a user
   * 
   * @param user    users cart to remove item from
   * @param product product to remove
   */
  @Transactional
  public void removeItemFromCart(User user, Product product) {
    ShoppingCartProduct cartItem = findCartItem(user, product);

    if (cartItem != null) {
      entityManager.remove(cartItem);
    }
  }

  /**
   * Updates the quantity of an item in the shopping cart
   * 
   * @param cartItem    Item to update quantity of
   * @param newQuantity New quantity of item
   */
  @Transactional
  public void updateCartItemQuantity(ShoppingCartProduct cartItem, int newQuantity) {
    cartItem.setQuantity(newQuantity);
    entityManager.merge(cartItem);
  }

  /**
   * Retrieves the items in the shopping cart for a specific user
   * 
   * @param user user to rertieve items from
   * @return a list of items in a users shoppingcart
   */
  public List<ShoppingCartProduct> getCartProducts(User user) {
    return entityManager.createQuery("SELECT c FROM ShoppingCartItem c WHERE c.user = :user", ShoppingCartProduct.class)
        .setParameter("user", user)
        .getResultList();
  }

  /**
   * Retrieves an exisiting product in a users shoppingcart
   * 
   * @param user    users shoppincart to look for product
   * @param product product to find
   * @return returns product if its in users shoppingcart, null if not.
   */
  private ShoppingCartProduct findCartItem(User user, Product product) {
    try {
      return entityManager
          .createQuery("SELECT c FROM ShoppingCartItem c WHERE c.user = :user AND c.product = :product",
              ShoppingCartProduct.class)
          .setParameter("user", user)
          .setParameter("product", product)
          .getSingleResult();
    } catch (NoResultException e) {
      return null;
    }
  }
}
