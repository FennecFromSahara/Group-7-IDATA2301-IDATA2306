package no.ntnu.group7.coffeeshop.dto;

import io.swagger.v3.oas.annotations.media.Schema;

@Schema(description = "DTO for review")
public class ReviewDto {

  @Schema(description = "Unique ID")
  private int id;
  @Schema(description = "Review content")
  private String reviewText;
  @Schema(description = "Review rating")
  private int rating;
  @Schema(description = "Username of the reviewer")
  private String username;

  public ReviewDto(int id, String reviewText, int rating, String username) {
    this.id = id;
    this.reviewText = reviewText;
    this.rating = rating;
    this.username = username;
  }

  /**
   * @return the id
   */
  public int getId() {
    return id;
  }

  /**
   * @return the reviewText
   */
  public String getReviewText() {
    return reviewText;
  }

  /**
   * @return the rating
   */
  public int getRating() {
    return rating;
  }

  /**
   * @return the username
   */
  public String getUsername() {
    return username;
  }

}