package no.ntnu.group7.coffeeshop.controllers;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.responses.ApiResponse;
import io.swagger.v3.oas.annotations.responses.ApiResponses;
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
   * @return A response indicating success or failure of the operation.
   */
  @PostMapping("")
  @Operation(
    summary = "Checkout"
  )
  @ApiResponses({
    @ApiResponse(responseCode = "200", description = "Successful"),
    @ApiResponse(responseCode = "401", description = "User not authenticated")
  })
  public ResponseEntity<String> checkout() {
    User user = accessUserService.getSessionUser();
    if (user == null) {
      return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body("User not authenticated");
    }

    checkoutService.checkout(user);
    return ResponseEntity.ok("Checkout successful");
  }
}
