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

  public int getId() {
    return id;
  }

  public String getReviewText() {
    return reviewText;
  }

  public int getRating() {
    return rating;
  }

  public String getUsername() {
    return username;
  }
}