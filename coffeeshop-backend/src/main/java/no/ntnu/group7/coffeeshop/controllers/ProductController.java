package no.ntnu.group7.coffeeshop.controllers;

import java.util.ArrayList;
import java.util.List;
import java.util.Map;
import java.util.stream.Collectors;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.server.ResponseStatusException;

import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.responses.ApiResponse;
import io.swagger.v3.oas.annotations.responses.ApiResponses;
import no.ntnu.group7.coffeeshop.dto.CategoryDto;
import no.ntnu.group7.coffeeshop.dto.ProductDto;
import no.ntnu.group7.coffeeshop.dto.ProductSizeDto;
import no.ntnu.group7.coffeeshop.dto.ReviewDto;
import no.ntnu.group7.coffeeshop.model.Category;
import no.ntnu.group7.coffeeshop.model.Product;
import no.ntnu.group7.coffeeshop.model.Review;
import no.ntnu.group7.coffeeshop.model.User;
import no.ntnu.group7.coffeeshop.repositories.CategoryRepository;
import no.ntnu.group7.coffeeshop.repositories.ProductRepository;
import no.ntnu.group7.coffeeshop.repositories.ReviewRepository;
import no.ntnu.group7.coffeeshop.repositories.UserRepository;

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

  @Autowired
  private ReviewRepository reviewRepository;

  @Autowired
  private UserRepository userRepository;

  /**
   * Handles HTTP GET requests to "/api/products" and returns a list of all
   * products in the database.
   *
   * @return A list of Product objects.
   */
  @GetMapping("")
  @Operation(summary = "Get all products")
  @ApiResponse(responseCode = "200", description = "Success")
  public ResponseEntity<List<ProductDto>> getAllProducts() {
    List<Product> products = productRepository.findAll();

    List<ProductDto> productDtos = products.stream().map(product -> {
      List<CategoryDto> categoryDtos = product.getCategories().stream()
          .map(category -> new CategoryDto(category.getId(), category.getName()))
          .collect(Collectors.toList());

      List<ProductSizeDto> productSizeDtos = product.getProductSizes().stream()
          .map(size -> new ProductSizeDto(size.getId(), size.getSize(), size.getWeight()))
          .collect(Collectors.toList());

      List<ReviewDto> reviewDtos = product.getReviews().stream()
          .map(review -> new ReviewDto(review.getId(), review.getReviewText(), review.getRating(),
              review.getUser().getUsername()))
          .collect(Collectors.toList());

      return new ProductDto(
          product.getId(),
          product.getName(),
          product.getDescription(),
          product.getInventoryAmount(),
          product.getPrice(),
          product.getImage(),
          categoryDtos,
          productSizeDtos,
          reviewDtos);
    }).collect(Collectors.toList());

    return new ResponseEntity<List<ProductDto>>(productDtos, HttpStatus.OK);
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
  @Operation(summary = "Get one product")
  @ApiResponses({
      @ApiResponse(responseCode = "200", description = "Success"),
      @ApiResponse(responseCode = "404", description = "Product not found")
  })
  public ResponseEntity<ProductDto> getProductById(@PathVariable int id) {
    Product product = productRepository.findById(id)
        .orElseThrow(() -> new ResponseStatusException(HttpStatus.NOT_FOUND, "Product not found"));

    List<CategoryDto> categoryDtos = product.getCategories().stream()
        .map(category -> new CategoryDto(category.getId(), category.getName()))
        .collect(Collectors.toList());

    List<ProductSizeDto> productSizeDtos = product.getProductSizes().stream()
        .map(size -> new ProductSizeDto(size.getId(), size.getSize(), size.getWeight()))
        .collect(Collectors.toList());

    List<ReviewDto> reviewDtos = product.getReviews().stream()
        .map(review -> new ReviewDto(review.getId(), review.getReviewText(), review.getRating(),
            review.getUser().getUsername()))
        .collect(Collectors.toList());

    ProductDto productDto = new ProductDto(
        product.getId(),
        product.getName(),
        product.getDescription(),
        product.getInventoryAmount(),
        product.getPrice(),
        product.getImage(),
        categoryDtos,
        productSizeDtos,
        reviewDtos);

    return new ResponseEntity<>(productDto, HttpStatus.OK);
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
  @Operation(summary = "Add one product")
  @ApiResponses({
      @ApiResponse(responseCode = "201", description = "Created"),
      @ApiResponse(responseCode = "404", description = "Category not found")
  })
  public ResponseEntity<Product> createProduct(@RequestBody ProductDto productDto) {
    Product product = new Product();
    product.setName(productDto.getName());
    product.setDescription(productDto.getDescription());
    product.setInventoryAmount(productDto.getInventoryAmount());
    product.setPrice(productDto.getPrice());
    product.setImage(productDto.getImage());

    List<CategoryDto> categoryDtos = productDto.getCategories();
    List<Category> categories = new ArrayList<>();

    for (CategoryDto categoryDto : categoryDtos) {
      Category category = categoryRepository.findById(categoryDto.getId())
          .orElseThrow(() -> new ResponseStatusException(HttpStatus.NOT_FOUND, "Category not found"));
      categories.add(category);
    }

    product.setCategories(categories);
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
  @Operation(summary = "Update one product")
  @ApiResponses({
      @ApiResponse(responseCode = "200", description = "Success"),
      @ApiResponse(responseCode = "404", description = "Product not found"),
      @ApiResponse(responseCode = "404", description = "Category not found")
  })
  public ResponseEntity<Product> updateProduct(@PathVariable int id, @RequestBody ProductDto productDto) {
    Product currentProduct = productRepository.findById(id)
        .orElseThrow(() -> new ResponseStatusException(HttpStatus.NOT_FOUND, "Product not found"));

    currentProduct.setName(productDto.getName());
    currentProduct.setDescription(productDto.getDescription());
    currentProduct.setInventoryAmount(productDto.getInventoryAmount());
    currentProduct.setPrice(productDto.getPrice());
    currentProduct.setImage(productDto.getImage());

    List<CategoryDto> categoryDtos = productDto.getCategories();
    List<Category> categories = new ArrayList<>();

    for (CategoryDto categoryDto : categoryDtos) {
      Category category = categoryRepository.findById(categoryDto.getId())
          .orElseThrow(() -> new ResponseStatusException(HttpStatus.NOT_FOUND, "Category not found"));
      categories.add(category);
    }

    currentProduct.setCategories(categories);
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
  @Operation(summary = "Delete one product")
  @ApiResponses({
      @ApiResponse(responseCode = "204", description = "Item removed successfully"),
      @ApiResponse(responseCode = "404", description = "Product not found")
  })
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
  @Operation(summary = "Get categories of one product")
  @ApiResponses({
      @ApiResponse(responseCode = "200", description = "Success"),
      @ApiResponse(responseCode = "404", description = "Product not found")
  })
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
  @Operation(summary = "Get all products of one category")
  @ApiResponses({
      @ApiResponse(responseCode = "201", description = "Created"),
      @ApiResponse(responseCode = "404", description = "Category not found"),
      @ApiResponse(responseCode = "404", description = "Product not found"), // TODO: should maybe have different codes
                                                                             // or smthn idk
      @ApiResponse(responseCode = "404", description = "User not found")
  })
  public ResponseEntity<List<Product>> getProductsByCategory(@PathVariable int categoryId) {
    Category category = categoryRepository.findById(categoryId)
        .orElseThrow(() -> new ResponseStatusException(HttpStatus.NOT_FOUND, "Category not found"));
    return new ResponseEntity<List<Product>>(category.getProducts(), HttpStatus.OK);
  }

  @PostMapping("/{id}/add-review")
  public ResponseEntity<Review> addReview(@PathVariable int id, @RequestBody ReviewDto reviewDto) {
    Product product = productRepository.findById(id)
        .orElseThrow(() -> new ResponseStatusException(HttpStatus.NOT_FOUND, "Product not found"));

    User user = userRepository.findByUsername(reviewDto.getUsername())
        .orElseThrow(() -> new ResponseStatusException(HttpStatus.NOT_FOUND, "User not found"));

    Review review = new Review();
    review.setReviewText(reviewDto.getReviewText());
    review.setRating(reviewDto.getRating());
    review.setProduct(product);
    review.setUser(user);
    Review newReview = reviewRepository.save(review);

    return new ResponseEntity<>(newReview, HttpStatus.CREATED);
  }

  /**
   * Handles HTTP GET requests to "/api/products/count" and returns the count of
   * products in the database.
   *
   * @return The count of Product objects.
   */
  @GetMapping("/count")
  @Operation(summary = "Get number of products in database")
  @ApiResponse(responseCode = "200", description = "Success")
  public ResponseEntity<Long> getProductCount() {
    long count = productRepository.count();
    return new ResponseEntity<>(count, HttpStatus.OK);
  }

  /**
   * Handles HTTP PATCH requests to "/api/products/{id}/image" and updates
   * the product image for the product with the specified ID. If the product is
   * not
   * found, returns a 404 Not Found response.
   *
   * @param id       The ID of the product to update the image.
   * @param imageMap The new image for the product as a map.
   * @return The updated product.
   */
  @PatchMapping("/{id}/image")
  @Operation(summary = "Update image of one product")
  @ApiResponses({
      @ApiResponse(responseCode = "200", description = "Success"),
      @ApiResponse(responseCode = "400", description = "Image not provided"),
      @ApiResponse(responseCode = "404", description = "Product not found")
  })
  public ResponseEntity<Product> updateProductImage(@PathVariable int id, @RequestBody Map<String, String> imageMap) {
    String image = imageMap.get("image");
    if (image == null) {
      throw new ResponseStatusException(HttpStatus.BAD_REQUEST, "Image not provided");
    }

    Product product = productRepository.findById(id)
        .orElseThrow(() -> new ResponseStatusException(HttpStatus.NOT_FOUND, "Product not found"));

    product.setImage(image);
    Product updatedProduct = productRepository.save(product);

    return new ResponseEntity<>(updatedProduct, HttpStatus.OK);
  }
}
