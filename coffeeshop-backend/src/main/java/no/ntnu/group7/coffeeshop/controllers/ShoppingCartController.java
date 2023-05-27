package no.ntnu.group7.coffeeshop.controllers;

import java.math.BigDecimal;
import java.util.List;
import java.util.Optional;
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
  private ProductRepository productRepository;

  @Autowired
  private ShoppingCartProductRepository shoppingCartProductRepository;

  @GetMapping("")
  public ResponseEntity<List<ShoppingCartProductDto>> getShoppingCart() {
    User user = accessUserService.getSessionUser();
    if (user == null) {
      return ResponseEntity.status(HttpStatus.UNAUTHORIZED).build();
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
      return ResponseEntity.status(HttpStatus.UNAUTHORIZED).build();
    }

    BigDecimal total = shoppingCartService.calculateShoppingCartTotal(user);
    return ResponseEntity.ok(total);
  }

  @DeleteMapping("/{id}")
  public ResponseEntity<String> deleteItemFromCart(@PathVariable int id) {
    User user = accessUserService.getSessionUser();
    if (user == null) {
      return ResponseEntity.status(HttpStatus.UNAUTHORIZED).build();
    }

    if (!productRepository.existsById(id)) {
      return ResponseEntity.status(HttpStatus.NOT_FOUND).body("Product not found");
    }

    Product product = productRepository.findById(id)
        .orElseThrow(() -> new ResponseStatusException(HttpStatus.NOT_FOUND, "Product not found"));
    shoppingCartService.removeItemFromCart(user, product);

    return ResponseEntity.noContent().build();
  }

  @PutMapping("")
  public ResponseEntity<Void> updateShoppingCartProductQuantity(
      @RequestBody ShoppingCartProductDto shoppingCartProductDto) {

    int id = shoppingCartProductDto.getId();
    int quantity = shoppingCartProductDto.getQuantity();

    ShoppingCartProduct shoppingCartProduct = shoppingCartProductRepository.findById(id)
        .orElseThrow(() -> new ResponseStatusException(HttpStatus.NOT_FOUND, "ShoppingCartProduct not found"));

    if (quantity <= 0) {
      return ResponseEntity.status(HttpStatus.BAD_REQUEST).build();
    }

    shoppingCartService.updateCartItemQuantity(shoppingCartProduct, quantity);

    return ResponseEntity.ok().build();
  }

  /**
   * Handles HTTP POST requests to "/api/shoppingCart/add-to-cart" and adds a
   * product to
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

    int productId = shoppingCartProductDto.getProductId();
    int quantity = shoppingCartProductDto.getQuantity();

    if (quantity <= 0) {
      return ResponseEntity.status(HttpStatus.BAD_REQUEST).body("Invalid quantity");
    }

    Optional<Product> optionalProduct = productRepository.findById(productId);
    if (optionalProduct.isEmpty()) {
      return ResponseEntity.status(HttpStatus.NOT_FOUND).body("Product not found");
    }

    Product product = optionalProduct.get();
    shoppingCartService.addItemToCart(user, product, quantity);
    return ResponseEntity.ok("Product added to cart");
  }
}