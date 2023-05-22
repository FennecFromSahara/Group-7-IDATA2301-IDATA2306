package no.ntnu.group7.coffeeshop.dto;

import java.math.BigDecimal;

public class ProductDto {

  private String name;
  private String description;
  private int inventoryAmount;
  private BigDecimal price;
  private String image;
  private String categories;

  public ProductDto() {
  }

  public ProductDto(String name, String description, int inventoryAmount, BigDecimal price, String image,
      String categories) {
    this.name = name;
    this.description = description;
    this.inventoryAmount = inventoryAmount;
    this.price = price;
    this.image = image;
    this.categories = categories;
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

  public String getCategories() {
    return categories;
  }
}
