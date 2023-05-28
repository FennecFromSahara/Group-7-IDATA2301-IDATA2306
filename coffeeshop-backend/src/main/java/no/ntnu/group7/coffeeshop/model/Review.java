package no.ntnu.group7.coffeeshop.model;

import com.fasterxml.jackson.annotation.JsonBackReference;
import com.fasterxml.jackson.annotation.JsonIdentityInfo;
import com.fasterxml.jackson.annotation.ObjectIdGenerators;

import io.swagger.v3.oas.annotations.media.Schema;
import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.FetchType;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.Table;
import jakarta.validation.constraints.Max;
import jakarta.validation.constraints.Min;

@JsonIdentityInfo(generator = ObjectIdGenerators.PropertyGenerator.class, property = "id")
@Entity
@Table(name = "reviews")
@Schema(description = "Represents a review of a product")
public class Review {
  @Id
  @GeneratedValue(strategy = GenerationType.IDENTITY)
  @Schema(description = "Unique ID")
  private int id;

  @ManyToOne
  @JoinColumn(name = "product_id", nullable = false)
  @JsonBackReference("product-review")
  @Schema(description = "The product this review is about")
  private Product product;

  @ManyToOne(fetch = FetchType.LAZY)
  @JoinColumn(name = "user_id", nullable = false)
  @JsonBackReference("user-review")
  @Schema(description = "The user who wrote the review")
  private User user;

  @Column(length = 2000, nullable = false)
  @Schema(description = "The content of the review")
  private String reviewText;

  @Column(nullable = false)
  @Min(1)
  @Max(5)
  @Schema(description = "Review rating")
  private int rating;

  public Review() {
  }

  public Review(Product product, User user, String reviewText, int rating) {
    this.product = product;
    this.user = user;
    this.reviewText = reviewText;
    this.rating = rating;
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
   * @return the reviewText
   */
  public String getReviewText() {
    return reviewText;
  }

  /**
   * @param reviewText the reviewText to set
   */
  public void setReviewText(String reviewText) {
    this.reviewText = reviewText;
  }

  /**
   * @return the rating
   */
  public int getRating() {
    return rating;
  }

  /**
   * @param rating the rating to set
   */
  public void setRating(int rating) {
    this.rating = rating;
  }

}
