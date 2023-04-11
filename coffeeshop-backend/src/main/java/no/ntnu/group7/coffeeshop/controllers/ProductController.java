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
 * Controller responsible for the products.
 */
@RestController
@CrossOrigin(origins = "http://localhost:3000")
@RequestMapping("/api/products")
public class ProductController {

  @Autowired
  private ProductRepository productRepository;

  // GET all products
  @GetMapping("")
  public List<Product> getAllProducts() {
    return productRepository.findAll();
  }

  // GET product by ID
  @GetMapping("/{id}")
  public ResponseEntity<Product> getProductById(@PathVariable int id) {
    Product product = productRepository.findById(id)
        .orElseThrow(() -> new ResponseStatusException(HttpStatus.NOT_FOUND, "Product not found"));
    return new ResponseEntity<Product>(product, HttpStatus.OK);
  }

  // CREATE product
  @PostMapping("")
  public ResponseEntity<Product> createProduct(@RequestBody Product product) {
    Product newProduct = productRepository.save(product);
    return new ResponseEntity<Product>(newProduct, HttpStatus.CREATED);
  }

  // UPDATE product
  @PutMapping("/{id}")
  public ResponseEntity<Product> updateProduct(@PathVariable int id, @RequestBody Product product) {
    if (!productRepository.existsById(id)) {
      throw new ResponseStatusException(HttpStatus.NOT_FOUND, "Product not found");
    }
    product.setId(id);
    Product updatedProduct = productRepository.save(product);
    return new ResponseEntity<Product>(updatedProduct, HttpStatus.OK);
  }

  // DELETE product by ID
  @DeleteMapping("/{id}")
  public ResponseEntity<Void> deleteProduct(@PathVariable int id) {
    if (!productRepository.existsById(id)) {
      throw new ResponseStatusException(HttpStatus.NOT_FOUND, "Product not found");
    }
    productRepository.deleteById(id);
    return new ResponseEntity<Void>(HttpStatus.NO_CONTENT);
  }
}
