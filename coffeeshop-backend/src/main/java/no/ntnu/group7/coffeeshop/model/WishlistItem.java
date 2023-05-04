package no.ntnu.group7.coffeeshop.model;

import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.Table;

/**
 * WishlistItem model class that represents a single item in a user's wishlist.
 * This class is responsible for storing the associations between a user and a
 * product they have added to their wishlist. It is mapped to the "wishlist"
 * table in the database.
 */
@Entity
@Table(name = "wishlist")
public class WishlistItem {
  @Id
  @GeneratedValue(strategy = GenerationType.IDENTITY)
  private int id;

  @ManyToOne
  @JoinColumn(name = "user_id", nullable = false)
  private User user;

  @ManyToOne
  @JoinColumn(name = "product_id", nullable = false)
  private Product product;

  /**
   * Empty constructor needed for JPA.
   */
  public WishlistItem() {
  }

  /**
   * Constructs a new WishlistItem with the specified user and product.
   *
   * @param user    The user who added the product to their wishlist.
   * @param product The product added to the user's wishlist.
   */
  public WishlistItem(User user, Product product) {
    this.user = user;
    this.product = product;
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
}
