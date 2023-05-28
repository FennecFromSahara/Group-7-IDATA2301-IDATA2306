package no.ntnu.group7.coffeeshop.dto;

import io.swagger.v3.oas.annotations.media.Schema;

@Schema(description = "Represents a category DTO")
public class CategoryDto {
  @Schema(description = "Unique ID")
  private int id;
  @Schema(description = "Category name")
  private String name;

  public CategoryDto() {
  }

  public CategoryDto(int id, String name) {
    this.id = id;
    this.name = name;
  }

  /**
   * @return the id
   */
  public int getId() {
    return id;
  }

  /**
   * @return the name
   */
  public String getName() {
    return name;
  }

}
