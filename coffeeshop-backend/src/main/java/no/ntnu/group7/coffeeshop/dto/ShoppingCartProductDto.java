package no.ntnu.group7.coffeeshop.dto;

import io.swagger.v3.oas.annotations.media.Schema;

/**
 * Data transfer object for shopping cart products. It contains the user ID,
 * product ID, and product quantity.
 */
@Schema(description = "DTO for ShoppingCartProduct")
public class ShoppingCartProductDto {
  @Schema(description = "Unqiue ID")
  private int id;
  @Schema(description = "Unique ID of user")
  private Long userId;
  @Schema(description = "Unique ID of product")
  private int productId;
  @Schema(description = "Quantity of product")
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

  /**
   * @return the id
   */
  public int getId() {
    return id;
  }

  /**
   * @return the userId
   */
  public Long getUserId() {
    return userId;
  }

  /**
   * @return the productId
   */
  public int getProductId() {
    return productId;
  }

  /**
   * @return the quantity
   */
  public int getQuantity() {
    return quantity;
  }

}