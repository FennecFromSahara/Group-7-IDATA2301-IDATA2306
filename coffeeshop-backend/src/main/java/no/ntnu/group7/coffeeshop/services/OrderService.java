package no.ntnu.group7.coffeeshop.services;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import no.ntnu.group7.coffeeshop.model.Order;
import no.ntnu.group7.coffeeshop.repositories.OrderRepository;

/**
 * OrderService is a service layer class responsible for managing orders in the
 * coffee shop application.
 */
@Service
public class OrderService {

  @Autowired
  private OrderRepository orderRepository;

  /**
   * Retrieves a list of all orders stored in the database.
   *
   * @return a List of Order objects containing the details of all orders
   */
  public List<Order> getAllOrders() {
    return orderRepository.findAll();
  }

}
