package no.ntnu.group7.coffeeshop.controllers;

import java.util.ArrayList;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.server.ResponseStatusException;

import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.Parameter;
import io.swagger.v3.oas.annotations.media.ArraySchema;
import io.swagger.v3.oas.annotations.media.Content;
import io.swagger.v3.oas.annotations.media.Schema;
import io.swagger.v3.oas.annotations.responses.ApiResponse;
import io.swagger.v3.oas.annotations.responses.ApiResponses;
import no.ntnu.group7.coffeeshop.dto.CategoryDto;
import no.ntnu.group7.coffeeshop.model.Category;
import no.ntnu.group7.coffeeshop.repositories.CategoryRepository;
import no.ntnu.group7.coffeeshop.services.CategoryService;

/**
 * Controller responsible for the categories for the products in the coffeshop.
 */
@RestController
@CrossOrigin(origins = "http://localhost:3000")
@RequestMapping("/api/categories")
public class CategoryController {
  @Autowired
  CategoryRepository categoryRepository;

  @Autowired
  CategoryService categoryService;

  /**
   * Handles HTTP GET requests to "/api/categories" and returns a list of all
   * Category objects in the database.
   *
   * @return A list of Category objects.
   */
  @GetMapping("")
  @Operation(summary = "Get all categories")
  @ApiResponse(responseCode = "400", description = "Success", content = @Content(array = @ArraySchema(schema = @Schema(implementation = CategoryDto.class))))
  public ResponseEntity<List<CategoryDto>> getAllCategories() {
    List<Category> categories = categoryRepository.findAll();
    List<CategoryDto> categoryDtos = new ArrayList<>();

    for (Category category : categories) {
      CategoryDto dto = new CategoryDto(category.getId(), category.getName());
      categoryDtos.add(dto);
    }

    return new ResponseEntity<List<CategoryDto>>(categoryDtos, HttpStatus.OK);
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
  @Operation(summary = "Get one category")
  @ApiResponses({
      @ApiResponse(responseCode = "200", description = "Success", content = @Content(schema = @Schema(implementation = CategoryDto.class))),
      @ApiResponse(responseCode = "404", description = "Product not found")
  })
  public ResponseEntity<CategoryDto> getCategoryById(
      @Parameter(description = "The ID of the Category object to retrieve") @PathVariable(value = "id") int categoryId) {
    Category category = categoryRepository.findById(categoryId)
        .orElseThrow(() -> new ResponseStatusException(HttpStatus.NOT_FOUND, "Product not found"));

    CategoryDto categoryDto = new CategoryDto(category.getId(), category.getName());

    return new ResponseEntity<CategoryDto>(categoryDto, HttpStatus.OK);
  }

  /**
   * Handles HTTP POST requests to "/api/categories" and creates a new Category
   * object in the database.
   *
   * @param category The Category object to create.
   * @return The created Category object.
   */
  @PostMapping("")
  @Operation(summary = "Add category")
  @ApiResponse(responseCode = "201", description = "Created", content = @Content(schema = @Schema(implementation = Category.class)))
  public ResponseEntity<Category> createCategory(
      @Parameter(description = "The Category object to create") @RequestBody CategoryDto categoryDto) {
    Category newCategory = categoryRepository.save(new Category(categoryDto.getName()));

    return new ResponseEntity<Category>(newCategory, HttpStatus.CREATED);
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
  @Operation(summary = "Delete category")
  @ApiResponses({
      @ApiResponse(responseCode = "204", description = "Item removed successfully"),
      @ApiResponse(responseCode = "404", description = "Category not found")
  })
  // TODO: maybe not void?
  public ResponseEntity<Void> deleteCategory(
      @Parameter(description = "The ID of the Category object to delete") @PathVariable(value = "id") int categoryId) {
    if (categoryService.deleteCategory(categoryId)) {
      return new ResponseEntity<Void>(HttpStatus.NO_CONTENT);
    }

    return new ResponseEntity<Void>(HttpStatus.NOT_FOUND);
  }

}
