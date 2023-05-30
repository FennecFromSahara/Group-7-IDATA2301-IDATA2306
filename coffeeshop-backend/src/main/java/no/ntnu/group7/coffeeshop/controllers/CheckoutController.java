package no.ntnu.group7.coffeeshop.controllers;

import java.util.List;
import java.util.stream.Collectors;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.media.Content;
import io.swagger.v3.oas.annotations.media.Schema;
import io.swagger.v3.oas.annotations.responses.ApiResponse;
import io.swagger.v3.oas.annotations.responses.ApiResponses;
import no.ntnu.group7.coffeeshop.dto.OrderDto;
import no.ntnu.group7.coffeeshop.dto.OrderProductDto;
import no.ntnu.group7.coffeeshop.model.Order;
import no.ntnu.group7.coffeeshop.model.User;
import no.ntnu.group7.coffeeshop.services.AccessUserService;
import no.ntnu.group7.coffeeshop.services.CheckoutService;

/**
 * Controller responsible for managing checkouts in the coffeeshop.
 */
@RestController
@CrossOrigin(origins = "http://localhost:3000")
@RequestMapping("/api/checkout")
public class CheckoutController {

  @Autowired
  private AccessUserService accessUserService;

  @Autowired
  private CheckoutService checkoutService;

  /**
   * HTTP POST endpoint for handling checkout
   * 
   * @return DTO of the order.
   */
  @PostMapping("")
  @Operation(
    summary = "Checkout"
  )
  @ApiResponses({
    @ApiResponse(responseCode = "200", description = "Successful", content = @Content(schema = @Schema(implementation = OrderDto.class))),
    @ApiResponse(responseCode = "401", description = "User not authenticated")
  })
  public ResponseEntity<OrderDto> checkout() {
    User user = accessUserService.getSessionUser();
    if (user == null) {
      return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body(null);
    }
  
    Order order = checkoutService.checkout(user);
  
    // Convert OrderProducts to OrderProductDtos
    List<OrderProductDto> orderProductDtos = order.getOrderProducts().stream()
        .map(op -> new OrderProductDto(op.getId(), op.getProduct().getName(), op.getQuantity()))
        .collect(Collectors.toList());
  
    // Convert Order to OrderDto
    OrderDto orderDto = new OrderDto(order.getId(), order.getUser().getUsername(), order.getOrderStatus().toString(),
        order.getTotal(), order.getCreatedAt().toString(), orderProductDtos);
  
    return ResponseEntity.ok(orderDto);
  }
}
