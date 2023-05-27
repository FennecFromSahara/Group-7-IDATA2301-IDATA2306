package no.ntnu.group7.coffeeshop.controllers;

import java.util.List;
import java.util.stream.Collectors;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.responses.ApiResponse;
import no.ntnu.group7.coffeeshop.dto.OrderDto;
import no.ntnu.group7.coffeeshop.dto.ShoppingCartProductDto;
import no.ntnu.group7.coffeeshop.model.Order;
import no.ntnu.group7.coffeeshop.model.Product;
import no.ntnu.group7.coffeeshop.model.User;
import no.ntnu.group7.coffeeshop.services.AccessUserService;
import no.ntnu.group7.coffeeshop.services.OrderService;
import no.ntnu.group7.coffeeshop.services.ShoppingCartService;

/**
 * Controller responsible for managing orders in the coffeeshop.
 */
@RestController
@CrossOrigin(origins = "http://localhost:3000")
@RequestMapping("/api/orders")
public class OrderController {

  @Autowired
  private AccessUserService accessUserService;

  @Autowired
  private ShoppingCartService shoppingCartService;

  @Autowired
  private OrderService orderService;

  /**
   * Handles HTTP GET requests to "/api/orders" and returns a list of all orders
   * in the system.
   *
   * @return A response containing a list of Order DTOs.
   */
  @GetMapping("")
  @Operation(
    summary = "Get all orders"
  )
  @ApiResponse(responseCode = "200", description = "Success")
  public ResponseEntity<List<OrderDto>> getAllOrders() {
    List<Order> orders = orderService.getAllOrders();
    List<OrderDto> orderDtos = orders.stream()
        .map(order -> new OrderDto(order.getId(), order.getUser(), order))
        .collect(Collectors.toList());
    return ResponseEntity.ok(orderDtos);
  }
}