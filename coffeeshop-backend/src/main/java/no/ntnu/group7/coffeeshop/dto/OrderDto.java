package no.ntnu.group7.coffeeshop.dto;

import java.math.BigDecimal;
import java.util.List;

import io.swagger.v3.oas.annotations.media.Schema;

/**
 * Data transfer object (DTO) for submitting orders.
 */
@Schema(description = "DTO for order")
public class OrderDto {
  @Schema(description = "Unqiue ID")
  private long id;
  @Schema(description = "Username of the user who placed the order")
  private String username;
  @Schema(description = "Status of order")
  private String orderStatus;
  @Schema(description = "Total price of order")
  private BigDecimal totalPrice;
  @Schema(description = "When the order was created")
  private String createdAt;
  @Schema(description = "List of orderProducts in the order")
  private List<OrderProductDto> orderProducts;

  /**
   * Constructs a new OrderDto
   * 
   * @param orderId     The unique identifier for the order.
   * @param username    The user that has the order.
   * @param orderstatus The status of the order.
   * @param createdAt   The orders creation date.
   */
  public OrderDto(long id, String username, String orderStatus, BigDecimal totalPrice, String createdAt,
      List<OrderProductDto> orderProducts) {
    this.id = id;
    this.username = username;
    this.orderStatus = orderStatus;
    this.totalPrice = totalPrice;
    this.createdAt = createdAt;
    this.orderProducts = orderProducts;
  }

  /**
   * @return the orderId
   */
  public long getId() {
    return id;
  }

  /**
   * @return the username
   */
  public String getUsername() {
    return username;
  }

  /**
   * @return the orderStatus
   */
  public String getOrderStatus() {
    return orderStatus;
  }

  /**
   * @return the createdAt
   */
  public String getCreatedAt() {
    return createdAt;
  }

  /**
   * @return the orderProducts
   */
  public List<OrderProductDto> getOrderProducts() {
    return orderProducts;
  }

  /**
   * @return the totalPrice
   */
  public BigDecimal getTotalPrice() {
    return totalPrice;
  }

}
