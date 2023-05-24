package no.ntnu.group7.coffeeshop.dto;

/**
 * Data transfer object for shopping cart products. It contains the user ID,
 * product ID, and product quantity.
 */
public class ShoppingCartProductDto {
  private int id;
  private Long userId;
  private int productId;
  private int quantity;

  /**
   * Constructs a new ShoppingCartProductDto with the specified user ID, product
   * ID, and quantity.
   *
   * @param userId    The unique identifier for the user.
   * @param productId The unique identifier for the product.
   * @param quantity  The quantity of the product in the shopping cart.
   */
  public ShoppingCartProductDto(int id, Long userId, int productId, int quantity) {
    this.id = id;
    this.userId = userId;
    this.productId = productId;
    this.quantity = quantity;
  }

  public int getId() {
    return id;
  }

  public Long getUserId() {
    return userId;
  }

  public int getProductId() {
    return productId;
  }

  public int getQuantity() {
    return quantity;
  }
}