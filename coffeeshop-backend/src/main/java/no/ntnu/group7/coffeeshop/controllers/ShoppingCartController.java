package no.ntnu.group7.coffeeshop.controllers;

import java.math.BigDecimal;
import java.util.List;
import java.util.stream.Collectors;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.server.ResponseStatusException;

import no.ntnu.group7.coffeeshop.dto.ShoppingCartProductDto;
import no.ntnu.group7.coffeeshop.model.Product;
import no.ntnu.group7.coffeeshop.model.ShoppingCartProduct;
import no.ntnu.group7.coffeeshop.model.User;
import no.ntnu.group7.coffeeshop.repositories.ProductRepository;
import no.ntnu.group7.coffeeshop.repositories.ShoppingCartProductRepository;
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

  @Autowired
  private ProductRepository productRepository;

  @Autowired
  private ShoppingCartProductRepository shoppingCartProductRepository;

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
            shoppingCartProduct.getId(),
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

    BigDecimal total = shoppingCartService.calculateShoppingCartTotal(user);
    System.out.println("hello:" + total);

    return ResponseEntity.ok(total);
  }

  @DeleteMapping("/{id}")
  public ResponseEntity<Void> deleteItemFromCart(@PathVariable int id) {
    User user = accessUserService.getSessionUser();
    if (user == null) {
      //return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body("User not authenticated");
    }

    if (!productRepository.existsById(id)) {
      throw new ResponseStatusException(HttpStatus.NOT_FOUND, "Product not found");
    }

    Product product = productRepository.findById(id)
    .orElseThrow(() -> new ResponseStatusException(HttpStatus.NOT_FOUND, "Product not found"));
    shoppingCartService.removeItemFromCart(user, product);

    return new ResponseEntity<Void>(HttpStatus.NO_CONTENT);
  }

  @PutMapping("")
  public ResponseEntity<Void> updateShoppingCartProductQuantity(@RequestBody ShoppingCartProductDto shoppingCartProductDto) {
    
    int id = shoppingCartProductDto.getId();
    int quantity = shoppingCartProductDto.getQuantity();

    System.out.println("id: " + id);

    ShoppingCartProduct shoppingCartProduct = shoppingCartProductRepository.findById(id)
    .orElseThrow(() -> new ResponseStatusException(HttpStatus.NOT_FOUND, "ShoppingCartProduct not found"));
    shoppingCartService.updateCartItemQuantity(shoppingCartProduct, quantity);

    return new ResponseEntity<Void>(HttpStatus.NO_CONTENT);
  }

  // @PutMapping("/{id}")
  // public ResponseEntity<Void> changeShoppingCartProductQuantityByOne(@PathVariable int id, @RequestBody String plusOrMinus) {
    
  //   ShoppingCartProduct shoppingCartProduct = shoppingCartProductRepository.findById(id)
  //   .orElseThrow(() -> new ResponseStatusException(HttpStatus.NOT_FOUND, "ShoppingCartProduct not found"));

  //   if (plusOrMinus == "+") {
  //     shoppingCartService.updateCartItemQuantity(shoppingCartProduct, shoppingCartProduct.getQuantity() + 1);
  //   } else if (plusOrMinus == "-") {
  //     shoppingCartService.updateCartItemQuantity(shoppingCartProduct, shoppingCartProduct.getQuantity() - 1);
  //   } else {

  //   }

    

  //   return new ResponseEntity<Void>(HttpStatus.NO_CONTENT);
  // }
}
