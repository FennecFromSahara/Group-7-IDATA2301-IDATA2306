package no.ntnu.group7.coffeeshop.services;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import no.ntnu.group7.coffeeshop.model.Order;
import no.ntnu.group7.coffeeshop.repositories.OrderRepository;

/**
 * Provides service for managing orders in the coffeeshop
 */
@Service
public class OrderService {

  @Autowired
  private OrderRepository orderRepository;

  public List<Order> getAllOrders() {
    return orderRepository.findAll();
  }

}
