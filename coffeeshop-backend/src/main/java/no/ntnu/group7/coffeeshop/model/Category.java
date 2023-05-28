package no.ntnu.group7.coffeeshop.model;

import java.util.ArrayList;
import java.util.List;

import com.fasterxml.jackson.annotation.JsonBackReference;
import com.fasterxml.jackson.annotation.JsonIdentityInfo;
import com.fasterxml.jackson.annotation.ObjectIdGenerators;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.ManyToMany;
import jakarta.persistence.Table;

/**
 * Represents a category a product can have
 */
@JsonIdentityInfo(generator = ObjectIdGenerators.PropertyGenerator.class, property = "id")
@Entity
@Table(name = "categories")
public class Category {
  @Id
  @GeneratedValue(strategy = GenerationType.IDENTITY)
  private int id;

  @Column(nullable = false)
  private String name;

  @ManyToMany(mappedBy = "categories")
  @JsonBackReference("product-category")
  private List<Product> products = new ArrayList<>();

  /**
   * Empty constructor needed for JPA
   */
  public Category() {
  }

  /**
   * Constructor with name as parameter
   * 
   * @param name name of category
   */
  public Category(String name) {
    this.name = name;
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
   * @return the name
   */
  public String getName() {
    return name;
  }

  /**
   * @param name the name to set
   */
  public void setName(String name) {
    this.name = name;
  }

  /**
   * @return the products
   */
  public List<Product> getProducts() {
    return products;
  }

  /**
   * @param products the products to set
   */
  public void setProducts(List<Product> products) {
    this.products = products;
  }

}
