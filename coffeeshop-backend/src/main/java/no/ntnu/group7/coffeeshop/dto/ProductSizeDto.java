package no.ntnu.group7.coffeeshop.dto;

public class ProductSizeDto {

  private int id;
  private String size;
  private String weight;

  public ProductSizeDto(int id, String size, String weight) {
    this.id = id;
    this.size = size;
    this.weight = weight;
  }

  public int getId() {
    return id;
  }

  public String getSize() {
    return size;
  }

  public String getWeight() {
    return weight;
  }
}
