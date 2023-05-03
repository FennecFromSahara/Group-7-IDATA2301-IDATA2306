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

  @JsonProperty("createdAt")
  public String getCreatedAt() {
    LocalDateTime createdAtLocalDateTime = LocalDateTime.ofInstant(order.getCreatedAt().toInstant(),
        ZoneId.systemDefault());
    return createdAtLocalDateTime.format(DateTimeFormatter.ISO_LOCAL_DATE_TIME);
  }
}
