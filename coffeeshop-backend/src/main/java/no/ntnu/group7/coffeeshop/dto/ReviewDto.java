package no.ntnu.group7.coffeeshop.dto;

public class ReviewDto {

  private int id;
  private String reviewText;
  private int rating;
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