package no.ntnu.group7.coffeeshop.model;

import com.fasterxml.jackson.annotation.JsonBackReference;
import com.fasterxml.jackson.annotation.JsonIdentityInfo;
import com.fasterxml.jackson.annotation.ObjectIdGenerators;

import io.swagger.v3.oas.annotations.media.Schema;
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
@Schema(description = "Represents a product in a shoppingcart")
public class ShoppingCartProduct {
  @Id
  @GeneratedValue(strategy = GenerationType.IDENTITY)
  @Schema(description = "Unique ID")
  private int id;

  @ManyToOne
  @JoinColumn(name = "user_id", nullable = false)
  @Schema(description = "The user this ShoppingCartProduct belong to")
  private User user;

  @ManyToOne
  @JoinColumn(name = "product_id", nullable = false)
  @JsonBackReference("product-cart")
  @Schema(description = "The product the ShoppingCartProduct represents")
  private Product product;

  @Column(nullable = false)
  @Schema(description = "Quantity of the product")
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
   * @return the user
   */
  public User getUser() {
    return user;
  }

  /**
   * @param user the user to set
   */
  public void setUser(User user) {
    this.user = user;
  }

  /**
   * @return the product
   */
  public Product getProduct() {
    return product;
  }

  /**
   * @param product the product to set
   */
  public void setProduct(Product product) {
    this.product = product;
  }

  /**
   * @return the quantity
   */
  public int getQuantity() {
    return quantity;
  }

  /**
   * @param quantity the quantity to set
   */
  public void setQuantity(int quantity) {
    this.quantity = quantity;
  }

}
