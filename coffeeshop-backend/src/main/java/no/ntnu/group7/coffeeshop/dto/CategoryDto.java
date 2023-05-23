package no.ntnu.group7.coffeeshop.dto;

public class CategoryDto {
  private int id;
  private String name;

  public CategoryDto() {
  }

  public CategoryDto(int id, String name) {
    this.id = id;
    this.name = name;
  }

  public int getId() {
    return id;
  }

  public String getName() {
    return name;
  }
}
