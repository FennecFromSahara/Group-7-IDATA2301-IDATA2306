package no.ntnu.group7.coffeeshop.controllers;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.server.ResponseStatusException;

import no.ntnu.group7.coffeeshop.model.Product;
import no.ntnu.group7.coffeeshop.repositories.ProductRepository;

/**
 * Controller responsible for managing Products in the coffee shop.
 */
@RestController
@CrossOrigin(origins = "http://localhost:3000")
@RequestMapping("/api/products")
public class ProductController {

  @Autowired
  private ProductRepository productRepository;

  /**
   * Handles HTTP GET requests to "/api/products" and returns a list of all
   * products in the database.
   *
   * @return A list of Product objects.
   */
  @GetMapping("")
  public List<Product> getAllProducts() {
    return productRepository.findAll();
  }

  /**
   * Handles HTTP GET requests to "/api/products/{id}" and returns a single
   * product with the specified ID. If the product is not found, returns a 404 Not
   * Found response.
   *
   * @param id The ID of the Product object to retrieve.
   * @return The Product object with the specified ID.
   */
  @GetMapping("/{id}")
  public ResponseEntity<Product> getProductById(@PathVariable int id) {
    Product product = productRepository.findById(id)
        .orElseThrow(() -> new ResponseStatusException(HttpStatus.NOT_FOUND, "Product not found"));
    return new ResponseEntity<Product>(product, HttpStatus.OK);
  }

  /**
   * Handles HTTP POST requests to "/api/products" and adds a new product
   * in the database.
   *
   * @param product The product object to add.
   * @return The added product.
   */
  @PostMapping("")
  public ResponseEntity<Product> createProduct(@RequestBody Product product) {
    Product newProduct = productRepository.save(product);
    return new ResponseEntity<Product>(newProduct, HttpStatus.CREATED);
  }

  /**
   * Handles HTTP PUT requests to "/api/products/{id}" and updates an existing
   * product in the database with the specified ID. If the product is not
   * found, returns a 404 Not Found response.
   *
   * @param id      The ID of the product to update.
   * @param product The product containing the updated details.
   * @return The updated product.
   */
  @PutMapping("/{id}")
  public ResponseEntity<Product> updateProduct(@PathVariable int id, @RequestBody Product product) {
    if (!productRepository.existsById(id)) {
      throw new ResponseStatusException(HttpStatus.NOT_FOUND, "Product not found");
    }
    product.setId(id);
    Product updatedProduct = productRepository.save(product);
    return new ResponseEntity<Product>(updatedProduct, HttpStatus.OK);
  }

  /**
   * Handles HTTP DELETE requests to "/api/products/{id}" and deletes an existing
   * product from the database with the specified ID. If the product is not found,
   * returns a 404 Not Found response.
   *
   * @param id The ID of the product to delete.
   * @return A response indicating success or failure of the deletion.
   */
  @DeleteMapping("/{id}")
  public ResponseEntity<Void> deleteProduct(@PathVariable int id) {
    if (!productRepository.existsById(id)) {
      throw new ResponseStatusException(HttpStatus.NOT_FOUND, "Product not found");
    }
    productRepository.deleteById(id);
    return new ResponseEntity<Void>(HttpStatus.NO_CONTENT);
  }
}
