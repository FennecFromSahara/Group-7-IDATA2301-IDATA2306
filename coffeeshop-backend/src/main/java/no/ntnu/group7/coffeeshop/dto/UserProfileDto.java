package no.ntnu.group7.coffeeshop.dto;

import io.swagger.v3.oas.annotations.media.Schema;

/**
 * Data transfer object (DTO) for submitting changes and retrieving profile
 * data.
 */
@Schema(description = "DTO for a user profile")
public class UserProfileDto {
  @Schema(description = "Unqiue ID of user")
  private long id;
  @Schema(description = "First name")
  private String firstName;
  @Schema(description = "Fast name")
  private String lastName;
  @Schema(description = "Email")
  private String email;
  @Schema(description = "Address")
  private String address;
  @Schema(description = "Username")
  private String username;
  @Schema(description = "When the user was created")
  private String createdAt;
  @Schema(description = "Roles the user has")
  private String roles;

  /**
   * Constructs a new UserProfileDto
   *
   * @param id        The unique identifier for the user.
   * @param firstName The users first name.
   * @param lastName  The users last name.
   * @param email     The users email address.
   * @param address   The users physical address.
   * @param username  The users username.
   * @param createdAt The users creation date.
   * @param roles     The users roles.
   */
  public UserProfileDto(long id, String firstName, String lastName, String email, String address, String username,
      String createdAt, String roles) {
    this.id = id;
    this.firstName = firstName;
    this.lastName = lastName;
    this.email = email;
    this.address = address;
    this.username = username;
    this.createdAt = createdAt;
    this.roles = roles;
  }

  public long getId() {
    return id;
  }

  public String getFirstName() {
    return firstName;
  }

  public String getLastName() {
    return lastName;
  }

  public String getEmail() {
    return email;
  }

  public String getAddress() {
    return address;
  }

  public String getUsername() {
    return username;
  }

  public String getCreatedAt() {
    return createdAt;
  }

  public String getRoles() {
    return roles;
  }
}
