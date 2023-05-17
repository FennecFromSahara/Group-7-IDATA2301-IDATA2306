package no.ntnu.group7.coffeeshop.controllers;

import java.math.BigDecimal;
import java.util.List;
import java.util.stream.Collectors;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import no.ntnu.group7.coffeeshop.dto.ShoppingCartProductDto;
import no.ntnu.group7.coffeeshop.model.ShoppingCartProduct;
import no.ntnu.group7.coffeeshop.model.User;
import no.ntnu.group7.coffeeshop.services.AccessUserService;
import no.ntnu.group7.coffeeshop.services.CheckoutService;
import no.ntnu.group7.coffeeshop.services.ShoppingCartService;

@RestController
@CrossOrigin(origins = "http://localhost:3000")
@RequestMapping("/api/shoppingCart")
public class ShoppingCartController {

  @Autowired
  private AccessUserService accessUserService;

  @Autowired
  private ShoppingCartService shoppingCartService;

  @Autowired
  private CheckoutService checkoutService;

  @GetMapping("")
  public ResponseEntity<List<ShoppingCartProductDto>> getShoppingCart() {
    User user = accessUserService.getSessionUser();
    if (user == null) {
      // return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body("User not
      // authenticated");
    }

    List<ShoppingCartProduct> shoppingCartProducts = shoppingCartService.getCartProducts(user);
    List<ShoppingCartProductDto> shoppingCartProductDtos = shoppingCartProducts.stream()
        .map(shoppingCartProduct -> new ShoppingCartProductDto(
            shoppingCartProduct.getUser().getId(),
            shoppingCartProduct.getProduct().getId(),
            shoppingCartProduct.getQuantity()))
        .collect(Collectors.toList());

    return ResponseEntity.ok(shoppingCartProductDtos);
  }

  @GetMapping("/total")
  public ResponseEntity<BigDecimal> getTotal() {
    User user = accessUserService.getSessionUser();
    if (user == null) {
      // return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body("User not
      // authenticated");
    }

    BigDecimal total = checkoutService.calculateShoppingCartTotal(user);

    return ResponseEntity.ok(total);
  }
}
