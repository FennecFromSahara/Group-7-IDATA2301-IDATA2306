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

  /**
   * @return the description
   */
  public String getDescription() {
    return description;
  }

  /**
   * @return the inventoryAmount
   */
  public int getInventoryAmount() {
    return inventoryAmount;
  }

  /**
   * @return the price
   */
  public BigDecimal getPrice() {
    return price;
  }

  /**
   * @return the image
   */
  public String getImage() {
    return image;
  }

  /**
   * @return the categories
   */
  public List<CategoryDto> getCategories() {
    return categories;
  }

  /**
   * @return the reviews
   */
  public List<ReviewDto> getReviews() {
    return reviews;
  }

}
