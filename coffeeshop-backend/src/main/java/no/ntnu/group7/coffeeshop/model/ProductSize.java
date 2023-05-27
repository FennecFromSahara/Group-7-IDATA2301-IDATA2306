package no.ntnu.group7.coffeeshop.model;

import com.fasterxml.jackson.annotation.JsonBackReference;
import com.fasterxml.jackson.annotation.JsonIdentityInfo;
import com.fasterxml.jackson.annotation.ObjectIdGenerators;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.FetchType;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.Table;

@JsonIdentityInfo(generator = ObjectIdGenerators.PropertyGenerator.class, property = "id")
@Entity
@Table(name = "product_sizes")
public class ProductSize {
  @Id
  @GeneratedValue(strategy = GenerationType.IDENTITY)
  private int id;

  @Column
  private String size;

  @Column
  private String weight;

  @ManyToOne(fetch = FetchType.LAZY)
  @JoinColumn(name = "product_id", nullable = false)
  @JsonBackReference("product-size")
  private Product product;

  public ProductSize() {

  }

  public ProductSize(String size, String weight) {
    this.size = size;
    this.weight = weight;
  }

  /**
   * @return the id
   */
  public int getId() {
    return id;
  }

  /**
   * @param id the id to set
   */
  public void setId(int id) {
    this.id = id;
  }

  /**
   * @return the size
   */
  public String getSize() {
    return size;
  }

  /**
   * @param size the size to set
   */
  public void setSize(String size) {
    this.size = size;
  }

  /**
   * @return the weight
   */
  public String getWeight() {
    return weight;
  }

  /**
   * @param weight the weight to set
   */
  public void setWeight(String weight) {
    this.weight = weight;
  }

  /**
   * @param product product to set the ProductSize
   */
  public void setProduct(Product product) {
    this.product = product;
  }

  /**
   * @return the product associated with the ProductSize
   */
  public Product geProduct() {
    return product;
  }
}
