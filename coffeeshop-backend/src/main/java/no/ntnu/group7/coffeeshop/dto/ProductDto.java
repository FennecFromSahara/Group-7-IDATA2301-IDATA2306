package no.ntnu.group7.coffeeshop.dto;

import java.math.BigDecimal;
import java.util.List;

import io.swagger.v3.oas.annotations.media.Schema;

@Schema(description = "DTO for product")
public class ProductDto {

  @Schema(description = "Unique ID")
  private int id;
  @Schema(description = "Name of the product")
  private String name;
  @Schema(description = "Product description")
  private String description;
  @Schema(description = "How much of this product is in stock")
  private int inventoryAmount;
  @Schema(description = "Product price")
  private BigDecimal price;
  @Schema(description = "Product image")
  private String image;
  @Schema(description = "List of categories this product belong in")
  private List<CategoryDto> categories;
  @Schema(description = "Reviews this product has")
  private List<ReviewDto> reviews;

  public ProductDto(int id, String name, String description, int inventoryAmount, BigDecimal price, String image,
      List<CategoryDto> categories, List<ReviewDto> reviews) {
    this.id = id;
    this.name = name;
    this.description = description;
    this.inventoryAmount = inventoryAmount;
    this.price = price;
    this.image = image;
    this.categories = categories;
    this.reviews = reviews;
  }

  public int getId() {
    return id;
  }

  public String getName() {
    return name;
  }

  public String getDescription() {
    return description;
  }

  public int getInventoryAmount() {
    return inventoryAmount;
  }

  public BigDecimal getPrice() {
    return price;
  }

  public String getImage() {
    return image;
  }

  public List<CategoryDto> getCategories() {
    return categories;
  }

  public List<ReviewDto> getReviews() {
    return reviews;
  }
}
