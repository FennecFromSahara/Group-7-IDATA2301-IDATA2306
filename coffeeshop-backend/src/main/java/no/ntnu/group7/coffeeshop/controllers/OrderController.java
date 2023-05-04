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
   * Handles HTTP POST requests to "/api/orders/add-to-cart" and adds a product to
   * the shopping cart of the user.
   *
   * @param shoppingCartProductDto The DTO containing the ID of the product to add
   *                               and the quantity.
   * @return A response indicating success or failure of the operation.
   */
  @PostMapping("/add-to-cart")
  public ResponseEntity<String> addToCart(@RequestBody ShoppingCartProductDto shoppingCartProductDto) {
    User user = accessUserService.getSessionUser();
    if (user == null) {
      return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body("User not authenticated");
    }

    Product product = new Product();
    product.setId(shoppingCartProductDto.getProductId());

    shoppingCartService.addItemToCart(user, product, shoppingCartProductDto.getQuantity());
    return ResponseEntity.ok("Product added to cart");
  }

  /**
   * Handles HTTP GET requests to "/api/orders" and returns a list of all orders
   * in the system.
   *
   * @return A response containing a list of Order DTOs.
   */
  @GetMapping("")
  public ResponseEntity<List<OrderDto>> getAllOrders() {
    List<Order> orders = orderService.getAllOrders();
    List<OrderDto> orderDtos = orders.stream()
        .map(order -> new OrderDto(order.getId(), order.getUser(), order))
        .collect(Collectors.toList());
    return ResponseEntity.ok(orderDtos);
  }
}