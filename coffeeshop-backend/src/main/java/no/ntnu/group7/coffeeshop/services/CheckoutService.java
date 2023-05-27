package no.ntnu.group7.coffeeshop.services;

import java.math.BigDecimal;
import java.util.Date;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import jakarta.persistence.EntityManager;
import jakarta.persistence.PersistenceContext;
import jakarta.transaction.Transactional;
import no.ntnu.group7.coffeeshop.model.Order;
import no.ntnu.group7.coffeeshop.model.OrderProduct;
import no.ntnu.group7.coffeeshop.model.Product;
import no.ntnu.group7.coffeeshop.model.ShoppingCartProduct;
import no.ntnu.group7.coffeeshop.model.User;

/**
 * CheckoutService is a service layer class that handles the checkout process
 * for users in the coffee shop application. It manages the shopping cart,
 * inventory updates, and order creation.
 */
@Service
public class CheckoutService {

  @PersistenceContext
  private EntityManager entityManager;

  @Autowired
  private ShoppingCartService shoppingCartService;

  @Autowired
  private InventoryService inventoryService;

  /**
   * Performs the checkout process for a given user. Creates an order, adds
   * shopping cart items to the order, updates the inventory, clears the user's
   * shopping cart, and sets the order status to PROCESSING.
   *
   * @param user the user to checkout
   */
  @Transactional
  public void checkout(User user) {
    BigDecimal total = shoppingCartService.calculateShoppingCartTotal(user);

    Order order = new Order();
    order.setUser(user);
    order.setOrderStatus(Order.OrderStatus.PENDING);
    order.setTotal(total);
    order.setCreatedAt(new Date());

    entityManager.persist(order);

    // Add the items from the shopping cart to the order
    List<ShoppingCartProduct> cartItems = shoppingCartService.getCartProducts(user);
    for (ShoppingCartProduct cartItem : cartItems) {
      OrderProduct orderItem = new OrderProduct();
      orderItem.setOrder(order);
      orderItem.setProduct(cartItem.getProduct());
      orderItem.setQuantity(cartItem.getQuantity());

      entityManager.persist(orderItem);
    }

    // Removes product from inventory that are in the shopping cart
    updateInventoryAfterCheckout(user);

    // Clear the shopping cart
    shoppingCartService.clearShoppingCart(user);

    // Updates the order status
    order.setOrderStatus(Order.OrderStatus.PROCESSING);
  }

  /**
   * Updates the inventory after a user completes the checkout process. Reduces
   * the inventory amount for each product in the user's shopping cart according
   * to the purchased quantity.
   *
   * @param user the user whose purchased products should be removed from the
   *             inventory
   */
  @Transactional
  public void updateInventoryAfterCheckout(User user) {
    List<ShoppingCartProduct> cartProducts = shoppingCartService.getCartProducts(user);

    for (ShoppingCartProduct cartProduct : cartProducts) {
      Product product = cartProduct.getProduct();

      int updatedQuantity = product.getInventoryAmount() - cartProduct.getQuantity();
      product.setInventoryAmount(updatedQuantity);
      inventoryService.updateProduct(product);
    }
  }

}
