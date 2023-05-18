package no.ntnu.group7.coffeeshop.controllers;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.server.ResponseStatusException;

import no.ntnu.group7.coffeeshop.dto.ProductDto;
import no.ntnu.group7.coffeeshop.model.Category;
import no.ntnu.group7.coffeeshop.model.Product;
import no.ntnu.group7.coffeeshop.repositories.CategoryRepository;
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

  @Autowired
  private CategoryRepository categoryRepository;

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
   * @param productDto The product DTO (Data Transfer Object) with details about
   *                   the object to add.
   * @return The added product.
   */
  @PostMapping("")
  public ResponseEntity<Product> createProduct(@RequestBody ProductDto productDto) {
    Product product = new Product();
    product.setName(productDto.getName());
    product.setDescription(productDto.getDescription());
    product.setInventoryAmount(productDto.getInventoryAmount());
    product.setPrice(productDto.getPrice());
    product.setImage(productDto.getImage());

    Product newProduct = productRepository.save(product);

    return new ResponseEntity<Product>(newProduct, HttpStatus.CREATED);
  }

  /**
   * Handles HTTP PUT requests to "/api/products/{id}" and updates an existing
   * product in the database with the specified ID. If the product is not
   * found, returns a 404 Not Found response.
   *
   * @param id         The ID of the product to update.
   * @param productDto The product DTO (Data transfer object) containing the
   *                   updated details.
   * @return The updated product.
   */
  @PutMapping("/{id}")
  public ResponseEntity<Product> updateProduct(@PathVariable int id, @RequestBody ProductDto productDto) {
    if (!productRepository.existsById(id)) {
      throw new ResponseStatusException(HttpStatus.NOT_FOUND, "Product not found");
    }

    Product currentProduct = productRepository.findById(id)
        .orElseThrow(() -> new ResponseStatusException(HttpStatus.NOT_FOUND, "Product not found"));

    currentProduct.setName(productDto.getName());
    currentProduct.setDescription(productDto.getDescription());
    currentProduct.setInventoryAmount(productDto.getInventoryAmount());
    currentProduct.setPrice(productDto.getPrice());
    currentProduct.setImage(productDto.getImage());

    Product updatedProduct = productRepository.save(currentProduct);

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

  /**
   * Handles HTTP GET requests to "/api/products/{id}/categories" and
   * returns a list of all categories of a particular product.
   *
   * @param id The ID of the Product object.
   * @return A list of Category objects.
   */
  @GetMapping("/{id}/categories")
  public ResponseEntity<List<Category>> getCategoriesOfProduct(@PathVariable int id) {
    Product product = productRepository.findById(id)
        .orElseThrow(() -> new ResponseStatusException(HttpStatus.NOT_FOUND, "Product not found"));
    return new ResponseEntity<List<Category>>(product.getCategories(), HttpStatus.OK);
  }

  /**
   * Handles HTTP GET requests to "/api/products/category/{categoryId}" and
   * returns a list of all products in a particular category.
   *
   * @param categoryId The ID of the Category object.
   * @return A list of Product objects.
   */
  @GetMapping("/category/{categoryId}")
  public ResponseEntity<List<Product>> getProductsByCategory(@PathVariable int categoryId) {
    Category category = categoryRepository.findById(categoryId)
        .orElseThrow(() -> new ResponseStatusException(HttpStatus.NOT_FOUND, "Category not found"));
    return new ResponseEntity<List<Product>>(category.getProducts(), HttpStatus.OK);
  }
}
