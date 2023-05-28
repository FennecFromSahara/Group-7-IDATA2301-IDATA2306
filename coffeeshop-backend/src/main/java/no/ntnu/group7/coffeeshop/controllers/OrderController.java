package no.ntnu.group7.coffeeshop.controllers;

import java.util.List;
import java.util.stream.Collectors;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.server.ResponseStatusException;

import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.parameters.RequestBody;
import io.swagger.v3.oas.annotations.responses.ApiResponse;
import io.swagger.v3.oas.annotations.responses.ApiResponses;
import no.ntnu.group7.coffeeshop.dto.OrderDto;
import no.ntnu.group7.coffeeshop.dto.OrderProductDto;
import no.ntnu.group7.coffeeshop.model.Order;
import no.ntnu.group7.coffeeshop.repositories.OrderRepository;

/**
 * Controller responsible for managing orders in the coffeeshop.
 */
@RestController
@CrossOrigin(origins = "http://localhost:3000")
@RequestMapping("/api/orders")
public class OrderController {

  @Autowired
  private OrderRepository orderRepository;

  /**
   * Handles HTTP GET requests to "/api/orders" and returns a list of all orders
   * in the system.
   *
   * @return A response containing a list of Order DTOs.
   */
  @GetMapping("")
  @Operation(summary = "Get all orders")
  @ApiResponse(responseCode = "200", description = "Success")
  public ResponseEntity<List<OrderDto>> getAllOrders() {
    List<Order> orders = orderRepository.findAll();

    List<OrderDto> orderDtos = orders.stream().map(order -> {
      List<OrderProductDto> orderProductDtos = order.getOrderProducts().stream()
          .map(orderProduct -> new OrderProductDto(orderProduct.getId(), orderProduct.getProduct().getName(),
              orderProduct.getQuantity()))
          .collect(Collectors.toList());

      return new OrderDto(
          order.getId(),
          order.getUser().getUsername(),
          order.getOrderStatus().toString(),
          order.getTotal(),
          order.getCreatedAt().toString(),
          orderProductDtos);
    }).collect(Collectors.toList());

    return new ResponseEntity<List<OrderDto>>(orderDtos, HttpStatus.OK);
  }

  /**
   * Handles HTTP PUT requests to "/api/orders/{id}" and updates an existingorder
   * in the database with the specified ID. If the order is not found, returns a
   * 404 Not Found response.
   *
   * @param id       The ID of the order to update.
   * @param orderDto The order DTO (Data transfer object) containing the
   *                 updated details.
   * @return The updated order.
   */
  @PutMapping("/{id}")
  @Operation(summary = "Update an order")
  @ApiResponses({
      @ApiResponse(responseCode = "200", description = "Success"),
      @ApiResponse(responseCode = "404", description = "Order not found"),
      @ApiResponse(responseCode = "400", description = "Invalid order status")
  })
  public ResponseEntity<Order> updateOrderStatus(@PathVariable int id,
      @RequestBody OrderDto orderDto) {

    Order currentOrder = orderRepository.findById(id)
        .orElseThrow(() -> new ResponseStatusException(HttpStatus.NOT_FOUND, "Order not found"));

    System.out.println(orderDto.getOrderStatus());

    try {
      Order.OrderStatus status = Order.OrderStatus.valueOf(orderDto.getOrderStatus());
      currentOrder.setOrderStatus(status);
    } catch (IllegalArgumentException e) {
      throw new ResponseStatusException(HttpStatus.BAD_REQUEST, "Invalid order status");
    }

    Order updatedOrder = orderRepository.save(currentOrder);

    return new ResponseEntity<>(updatedOrder, HttpStatus.OK);
  }

  /**
   * Handles HTTP DELETE requests to "/api/orders/{id}" and deletes an
   * existingorder from the database with the specified ID. If the order is not
   * found, returns a 404 Not Found response.
   *
   * @param id The ID of the order to delete.
   * @return A response indicating success or failure of the deletion.
   */
  @DeleteMapping("/{id}")
  @Operation(summary = "Delete an order")
  @ApiResponses({
      @ApiResponse(responseCode = "204", description = "Item removed successfully"),
      @ApiResponse(responseCode = "404", description = "Order not found")
  })
  public ResponseEntity<Void> deleteOrder(@PathVariable int id) {
    if (!orderRepository.existsById(id)) {
      throw new ResponseStatusException(HttpStatus.NOT_FOUND, "Order not found");
    }

    orderRepository.deleteById(id);

    return new ResponseEntity<Void>(HttpStatus.NO_CONTENT);
  }

  @PatchMapping("/{id}/{status}")
  @Operation(summary = "Update order status")
  @ApiResponses({
      @ApiResponse(responseCode = "200", description = "Success"),
      @ApiResponse(responseCode = "404", description = "Order not found"),
      @ApiResponse(responseCode = "400", description = "Invalid order status"),
  })
  public ResponseEntity<OrderDto> updateOrderStatus(@PathVariable int id, @PathVariable String status) {
    Order currentOrder = orderRepository.findById(id)
        .orElseThrow(() -> new ResponseStatusException(HttpStatus.NOT_FOUND, "Order not found"));

    try {
      Order.OrderStatus orderStatus = Order.OrderStatus.valueOf(status.toUpperCase());
      currentOrder.setOrderStatus(orderStatus);
    } catch (IllegalArgumentException e) {
      throw new ResponseStatusException(HttpStatus.BAD_REQUEST, "Invalid order status");
    }

    Order updatedOrder = orderRepository.save(currentOrder);

    List<OrderProductDto> orderProductDtos = updatedOrder.getOrderProducts().stream()
        .map(orderProduct -> new OrderProductDto(orderProduct.getId(), orderProduct.getProduct().getName(),
            orderProduct.getQuantity()))
        .collect(Collectors.toList());

    OrderDto updatedOrderDto = new OrderDto(
        updatedOrder.getId(),
        updatedOrder.getUser().getUsername(),
        updatedOrder.getOrderStatus().toString(),
        updatedOrder.getTotal(),
        updatedOrder.getCreatedAt().toString(),
        orderProductDtos);

    return new ResponseEntity<>(updatedOrderDto, HttpStatus.OK);
  }
}