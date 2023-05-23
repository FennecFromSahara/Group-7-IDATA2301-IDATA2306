package no.ntnu.group7.coffeeshop.dto;

import java.math.BigDecimal;
import java.util.List;

public class ProductDto {

  private int id;
  private String name;
  private String description;
  private int inventoryAmount;
  private BigDecimal price;
  private String image;
  private List<CategoryDto> categories;

  public ProductDto(int id, String name, String description, int inventoryAmount, BigDecimal price, String image,
      List<CategoryDto> categories) {
    this.id = id;
    this.name = name;
    this.description = description;
    this.inventoryAmount = inventoryAmount;
    this.price = price;
    this.image = image;
    this.categories = categories;
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
}
