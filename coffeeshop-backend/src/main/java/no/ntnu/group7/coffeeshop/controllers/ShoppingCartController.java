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

import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.responses.ApiResponse;
import io.swagger.v3.oas.annotations.responses.ApiResponses;
import no.ntnu.group7.coffeeshop.dto.ShoppingCartProductDto;
import no.ntnu.group7.coffeeshop.model.Product;
import no.ntnu.group7.coffeeshop.model.ShoppingCartProduct;
import no.ntnu.group7.coffeeshop.model.User;
import no.ntnu.group7.coffeeshop.repositories.ProductRepository;
import no.ntnu.group7.coffeeshop.repositories.ShoppingCartProductRepository;
import no.ntnu.group7.coffeeshop.services.AccessUserService;
import no.ntnu.group7.coffeeshop.services.ShoppingCartService;

/**
 * Controller responsible for managing shopping cart related endpoints
 */
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

  /**
   * HTTP GET endpoint for getting all the products in the users cart
   * 
   * @return List of all shoppingCartProducts in the shoppingcart
   */
  @GetMapping("")
  @Operation(summary = "Get shopping cart items")
  @ApiResponses({
      @ApiResponse(responseCode = "200", description = "Success"),
      @ApiResponse(responseCode = "401", description = "Unauthorized")
  })
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

  /**
   * HTTP GET endpoint for getting the total cost of a users cart
   * 
   * @return The total cost of users shopping cart items
   */
  @GetMapping("/total")
  @Operation(summary = "Get total cost of shoppingcart")
  @ApiResponses({
      @ApiResponse(responseCode = "200", description = "Success"),
      @ApiResponse(responseCode = "401", description = "Unauthorized")
  })
  public ResponseEntity<BigDecimal> getTotal() {
    User user = accessUserService.getSessionUser();
    if (user == null) {
      return ResponseEntity.status(HttpStatus.UNAUTHORIZED).build();
    }

    BigDecimal total = shoppingCartService.calculateShoppingCartTotal(user);
    return ResponseEntity.ok(total);
  }

  /**
   * HTTP DELETE endpoint for deleting an item from cart
   * 
   * @param id id of the item to delete
   * @return A response indicating success or failure of the operation.
   */
  @DeleteMapping("/{id}")
  @Operation(summary = "Remove item from shoppingcart")
  @ApiResponses({
      @ApiResponse(responseCode = "204", description = "Item removed successfully"),
      @ApiResponse(responseCode = "401", description = "Unauthorized"),
      @ApiResponse(responseCode = "404", description = "Product not found")
  })
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

  /**
   * HTTP PUT endpoint for updating the quantity of a shoppingCartProduct
   * 
   * @param shoppingCartProductDto The shoppingCartProduct to update quantity of
   * @return A response indicating success or failure of the operation.
   */
  @PutMapping("")
  @Operation(summary = "Update shoppingCartProduct quantity")
  @ApiResponses({
      @ApiResponse(responseCode = "200", description = "Quantity updated successfully"),
      @ApiResponse(responseCode = "400", description = "Invalid quantity"),
      @ApiResponse(responseCode = "404", description = "ShoppingCartProduct not found")
  })
  public ResponseEntity<String> updateShoppingCartProductQuantity(
      @RequestBody ShoppingCartProductDto shoppingCartProductDto) {

    int id = shoppingCartProductDto.getId();
    int quantity = shoppingCartProductDto.getQuantity();

    ShoppingCartProduct shoppingCartProduct = shoppingCartProductRepository.findById(id)
        .orElseThrow(() -> new ResponseStatusException(HttpStatus.NOT_FOUND, "ShoppingCartProduct not found"));

    if (quantity <= 0) {
      return ResponseEntity.status(HttpStatus.BAD_REQUEST).build();
    }

    shoppingCartService.updateCartItemQuantity(shoppingCartProduct, quantity);

    return ResponseEntity.ok("Quantity updated successfully");
  }

  /**
   * Handles HTTP POST requests to "/api/shoppingCart/add-to-cart" and adds a
   * product to
   * the shopping cart of the user.
   *
   * @param shoppingCartProductDto The DTO containing the ID of the product, and
   *                               the quantity of the product
   * @return A response indicating success or failure of the operation.
   */
  @PostMapping("/add-to-cart")
  @Operation(summary = "Add product to cart")
  @ApiResponses({
      @ApiResponse(responseCode = "200", description = "Product added to cart successfully"),
      @ApiResponse(responseCode = "400", description = "Invalid quantity"),
      @ApiResponse(responseCode = "401", description = "Unauthorized"),
      @ApiResponse(responseCode = "404", description = "Product not found")
  })
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