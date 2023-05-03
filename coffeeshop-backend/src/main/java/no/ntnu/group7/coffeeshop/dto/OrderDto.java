package no.ntnu.group7.coffeeshop.dto;

import no.ntnu.group7.coffeeshop.model.Order;
import no.ntnu.group7.coffeeshop.model.User;

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
}
