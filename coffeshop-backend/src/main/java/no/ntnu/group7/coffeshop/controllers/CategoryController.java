package no.ntnu.group7.coffeshop.controllers;

import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import jakarta.validation.Valid;
import no.ntnu.group7.coffeshop.model.Category;
import no.ntnu.group7.coffeshop.repositories.CategoryRepository;

/**
 * Controller responsible for the categories.
 */
@RestController
@CrossOrigin(origins = "http://localhost:3000")
@RequestMapping("/api/categories")
public class CategoryController {
  @Autowired
  CategoryRepository categoryRepository;

  // GET all categories
  @GetMapping("")
  public List<Category> getAllCategories() {
    return categoryRepository.findAll();
  }

  // GET category by ID
  @GetMapping("/{id}")
  public ResponseEntity<Category> getCategoryById(@PathVariable(value = "id") int categoryId) {
    Optional<Category> optionalCategory = categoryRepository.findById(categoryId);
    Category category = optionalCategory.get();

    if (category == null) {
      return ResponseEntity.notFound().build();
    }
    return ResponseEntity.ok().body(category);
  }

  // CREATE category
  @PostMapping("")
  public Category createCategory(@Valid @RequestBody Category category) {
    return categoryRepository.save(category);
  }

  // UPDATE category
  @PutMapping("/{id}")
  public ResponseEntity<Category> updateCategory(@PathVariable(value = "id") int categoryId,
      @Valid @RequestBody Category categoryDetails) {

    Optional<Category> optionalCategory = categoryRepository.findById(categoryId);
    Category category = optionalCategory.get();

    if (category == null) {
      return ResponseEntity.notFound().build();
    }
    category.setName(categoryDetails.getName());

    Category updatedCategory = categoryRepository.save(category);
    return ResponseEntity.ok(updatedCategory);
  }

  // DELETE category by ID
  @DeleteMapping("/{id}")
  public ResponseEntity<Category> deleteCategory(@PathVariable(value = "id") int categoryId) {
    Optional<Category> optionalCategory = categoryRepository.findById(categoryId);

    if (optionalCategory.isPresent()) {
      Category category = optionalCategory.get();

      // if (category == null) {
      // return ResponseEntity.notFound().build();
      // }

      categoryRepository.delete(category);
      return new ResponseEntity<>(HttpStatus.NO_CONTENT);
    }

    return new ResponseEntity<>(HttpStatus.NOT_FOUND);
  }

}
