package no.ntnu.group7.coffeeshop.controllers;

import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import jakarta.validation.Valid;
import no.ntnu.group7.coffeeshop.model.Category;
import no.ntnu.group7.coffeeshop.repositories.CategoryRepository;

/**
 * Controller responsible for the categories for the products in the coffeshop.
 */
@RestController
@CrossOrigin(origins = "http://localhost:3000")
@RequestMapping("/api/categories")
public class CategoryController {
  @Autowired
  CategoryRepository categoryRepository;

  /**
   * Handles HTTP GET requests to "/api/categories" and returns a list of all
   * Category objects in the database.
   *
   * @return A list of Category objects.
   */
  @GetMapping("")
  public List<Category> getAllCategories() {
    return categoryRepository.findAll();
  }

  /**
   * Handles HTTP GET requests to "/api/categories/{id}" and returns a single
   * Category object with the specified ID.
   * If the Category object is not found, returns a 404 Not Found response.
   *
   * @param categoryId The ID of the Category object to retrieve.
   * @return The Category object with the specified ID.
   */
  @GetMapping("/{id}")
  public ResponseEntity<Category> getCategoryById(@PathVariable(value = "id") int categoryId) {
    Optional<Category> optionalCategory = categoryRepository.findById(categoryId);
    Category category = optionalCategory.get();

    if (category == null) {
      return ResponseEntity.notFound().build();
    }
    return ResponseEntity.ok().body(category);
  }

  /**
   * Handles HTTP POST requests to "/api/categories" and creates a new Category
   * object in the database.
   *
   * @param category The Category object to create.
   * @return The created Category object.
   */
  @PostMapping("")
  public Category createCategory(@Valid @RequestBody Category category) {
    return categoryRepository.save(category);
  }

  /**
   * Handles HTTP DELETE requests to "/api/categories/{id}" and deletes an
   * existing Category object from the database
   * with the specified ID. If the Category object is not found, returns a 404 Not
   * Found response.
   *
   * @param categoryId The ID of the Category object to delete.
   * @return A response indicating success or failure of the deletion.
   */
  @DeleteMapping("/{id}")
  public ResponseEntity<Category> deleteCategory(@PathVariable(value = "id") int categoryId) {
    Optional<Category> optionalCategory = categoryRepository.findById(categoryId);

    if (optionalCategory.isPresent()) {
      Category category = optionalCategory.get();

      categoryRepository.delete(category);
      return new ResponseEntity<>(HttpStatus.NO_CONTENT);
    }

    return new ResponseEntity<>(HttpStatus.NOT_FOUND);
  }

}
