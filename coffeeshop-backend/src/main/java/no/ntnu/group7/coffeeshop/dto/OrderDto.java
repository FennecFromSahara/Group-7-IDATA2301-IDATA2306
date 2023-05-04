package no.ntnu.group7.coffeeshop.dto;

import java.time.LocalDateTime;
import java.time.ZoneId;
import java.time.format.DateTimeFormatter;

import com.fasterxml.jackson.annotation.JsonProperty;

import no.ntnu.group7.coffeeshop.model.Order;
import no.ntnu.group7.coffeeshop.model.User;

/**
 * Data transfer object (DTO) for submitting orders.
 */
public class OrderDto {
  private int orderId;
  private User user;
  private Order order;

  /**
   * Constructs a new Order DTO with the specified order ID, user, and order.
   * 
   * @param orderId The unique identifier for the order.
   * @param user    The user associated with the order.
   * @param order   The order details.
   */
  public OrderDto(int orderId, User user, Order order) {
    this.orderId = orderId;
    this.user = user;
    this.order = order;
  }

  public int getOrderId() {
    return orderId;
  }

  public User getUser() {
    return user;
  }

  public Order getOrder() {
    return order;
  }

  /**
   * 
   * Retrieves the order creation timestamp as a formatted string.
   * 
   * @return A string representation of the order creation timestamp formatted as
   *         ISO_LOCAL_DATE_TIME.
   */
  @JsonProperty("createdAt")
  public String getCreatedAt() {
    LocalDateTime createdAtLocalDateTime = LocalDateTime.ofInstant(order.getCreatedAt().toInstant(),
        ZoneId.systemDefault());
    return createdAtLocalDateTime.format(DateTimeFormatter.ISO_LOCAL_DATE_TIME);
  }
}
