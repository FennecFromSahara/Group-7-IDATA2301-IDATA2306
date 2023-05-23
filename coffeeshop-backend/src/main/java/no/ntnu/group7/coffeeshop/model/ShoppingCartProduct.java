package no.ntnu.group7.coffeeshop.model;

import com.fasterxml.jackson.annotation.JsonBackReference;
import com.fasterxml.jackson.annotation.JsonIdentityInfo;
import com.fasterxml.jackson.annotation.ObjectIdGenerators;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.Table;

/**
 * Represents a product added to a customer's shopping cart. This class is
 * responsible for storing the relationship between a user, a product, and the
 * quantity of that product in the user's shopping cart. It is mapped tothe
 * "shopping_cart" table in the database.
 */
@JsonIdentityInfo(generator = ObjectIdGenerators.PropertyGenerator.class, property = "id")
@Entity
@Table(name = "shopping_cart")
public class ShoppingCartProduct {
  @Id
  @GeneratedValue(strategy = GenerationType.IDENTITY)
  private int id;

  @ManyToOne
  @JoinColumn(name = "user_id", nullable = false)
  private User user;

  @ManyToOne
  @JoinColumn(name = "product_id", nullable = false)
  @JsonBackReference("product-cart")
  private Product product;

  @Column(nullable = false)
  private int quantity;

  /**
   * Empty constructor needed for JPA
   */
  public ShoppingCartProduct() {
  }

  /**
   * Constructs a new ShoppingCartProduct with the specified user, product, and
   * quantity.
   *
   * @param user     The user associated with this shopping cart product.
   * @param product  The product associated with this shopping cart product.
   * @param quantity The quantity of the product in the shopping cart.
   */
  public ShoppingCartProduct(User user, Product product, int quantity) {
    this.user = user;
    this.product = product;
    this.quantity = quantity;
  }

  public int getId() {
    return id;
  }

  public void setId(int id) {
    this.id = id;
  }

  public User getUser() {
    return user;
  }

  public void setUser(User user) {
    this.user = user;
  }

  public Product getProduct() {
    return product;
  }

  public void setProduct(Product product) {
    this.product = product;
  }

  public int getQuantity() {
    return quantity;
  }

  public void setQuantity(int quantity) {
    this.quantity = quantity;
  }
}
