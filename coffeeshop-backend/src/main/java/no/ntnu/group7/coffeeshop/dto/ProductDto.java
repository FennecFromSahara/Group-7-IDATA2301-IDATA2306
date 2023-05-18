package no.ntnu.group7.coffeeshop.dto;

import java.math.BigDecimal;

public class ProductDto {

  private String name;
  private String description;
  private int inventoryAmount;
  private BigDecimal price;
  private String image;

  public ProductDto() {
  }

  public ProductDto(String name, String description, int inventoryAmount, BigDecimal price, String image) {
    this.name = name;
    this.description = description;
    this.inventoryAmount = inventoryAmount;
    this.price = price;
    this.image = image;
  }

  public String getName() {
    return name;
  }

  public void setName(String name) {
    this.name = name;
  }

  public String getDescription() {
    return description;
  }

  public void setDescription(String description) {
    this.description = description;
  }

  public int getInventoryAmount() {
    return inventoryAmount;
  }

  public void setInventoryAmount(int inventoryAmount) {
    this.inventoryAmount = inventoryAmount;
  }

  public BigDecimal getPrice() {
    return price;
  }

  public void setPrice(BigDecimal price) {
    this.price = price;
  }

  public String getImage() {
    return image;
  }

  public void setImage(String image) {
    this.image = image;
  }
}
