package no.ntnu.group7.coffeeshop.services;

import java.math.BigDecimal;
import java.util.Date;
import java.util.List;

import jakarta.persistence.EntityManager;
import jakarta.persistence.PersistenceContext;
import jakarta.transaction.Transactional;
import no.ntnu.group7.coffeeshop.model.Order;
import no.ntnu.group7.coffeeshop.model.OrderProduct;
import no.ntnu.group7.coffeeshop.model.Product;
import no.ntnu.group7.coffeeshop.model.ShoppingCartProduct;
import no.ntnu.group7.coffeeshop.model.User;

/**
 * Provides functionality needed for checkout
 */
public class CheckoutService {

  @PersistenceContext
  private EntityManager entityManager;

  private ShoppingCartService shoppingCartService;
  private InventoryService inventoryService;

  /**
   * Checkouts a user with their products in the shopping cart and sets the order
   * status to PROCESSING
   * 
   * @param user user to checkout
   */
  @Transactional
  public void checkout(User user) {
    BigDecimal total = calculateShoppingCartTotal(user);

    Order order = new Order();
    order.setUser(user);
    order.setOrderStatus(Order.OrderStatus.PENDING);
    order.setTotal(total);
    order.setCreatedAt(new Date());

    entityManager.persist(order);

    // Add the items from the shopping cart to the order
    List<ShoppingCartProduct> cartItems = getShoppingCartProducts(user);
    for (ShoppingCartProduct cartItem : cartItems) {
      OrderProduct orderItem = new OrderProduct();
      orderItem.setOrder(order);
      orderItem.setProduct(cartItem.getProduct());
      orderItem.setQuantity(cartItem.getQuantity());
      orderItem.setPrice(cartItem.getProduct().getPrice());

      entityManager.persist(orderItem);
    }

    // Removes product from inventory that are in the shopping cart
    updateInventoryAfterCheckout(user);

    // Clear the shopping cart
    clearShoppingCart(user);

    // TODO: Process the payment?

    // Updates the order status
    order.setOrderStatus(Order.OrderStatus.PROCESSING);
  }

  private BigDecimal calculateShoppingCartTotal(User user) {
    List<ShoppingCartProduct> cartItems = getShoppingCartProducts(user);

    BigDecimal total = BigDecimal.ZERO;

    for (ShoppingCartProduct cartItem : cartItems) {
      BigDecimal itemTotal = cartItem.getProduct().getPrice().multiply(new BigDecimal(cartItem.getQuantity()));
      total = total.add(itemTotal);
    }

    return total;
  }

  /**
   * Returns shopping cart products for the given user
   * 
   * @param user user to retrieve shoppingcart products from
   * @return a list of products in the users shopping cart
   */
  private List<ShoppingCartProduct> getShoppingCartProducts(User user) {
    return shoppingCartService.getCartProducts(user);
  }

  /**
   * Clears shopping cart for a given user
   * 
   * @param user user to clear shopping cart
   */
  private void clearShoppingCart(User user) {
    List<ShoppingCartProduct> cartProducts = shoppingCartService.getCartProducts(user);

    for (ShoppingCartProduct cartProduct : cartProducts) {
      shoppingCartService.removeItemFromCart(user, cartProduct.getProduct());
    }
  }

  /**
   * Updates the inventory after a user checks out with their products
   * 
   * @param user user whose produts are removed from inventory
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
