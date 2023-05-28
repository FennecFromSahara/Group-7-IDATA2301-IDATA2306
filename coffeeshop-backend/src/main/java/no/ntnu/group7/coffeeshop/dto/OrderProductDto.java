package no.ntnu.group7.coffeeshop.dto;

public class OrderProductDto {
  private long id;
  private String productName;
  private int quantity;

  /**
   * Constructs a new OrderProductDto
   * 
   * @param id          The id of the orderProduct.
   * @param productName The name or the product.
   * @param quantity    The quantity of the product.
   */
  public OrderProductDto(long id, String productName, int quantity) {
    this.id = id;
    this.productName = productName;
    this.quantity = quantity;
  }

  /**
   * @return the id
   */
  public long getId() {
    return id;
  }

  /**
   * @return the productName
   */
  public String getProductName() {
    return productName;
  }

  /**
   * @return the quantity
   */
  public int getQuantity() {
    return quantity;
  }

}
