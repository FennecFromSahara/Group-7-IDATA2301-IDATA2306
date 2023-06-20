package no.ntnu.group7.coffeeshop.dto;

import io.swagger.v3.oas.annotations.media.Schema;

/**
 * Code adapted from:
 * https://github.com/strazdinsg/app-dev/blob/main/security-demos/07-backend-frontend-jwt-auth/backend/src/main/java/no/ntnu/dto/UserProfileDto.java
 * 
 * Data transfer object (DTO) for submitting changes and retrieving profile
 * data.
 */
@Schema(description = "DTO for a user profile")
public class UserProfileDto {
  @Schema(description = "Unqiue ID of user")
  private long id;
  @Schema(description = "First name")
  private String firstName;
  @Schema(description = "Last name")
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

  /**
   * @return the id
   */
  public long getId() {
    return id;
  }

  /**
   * @return the firstName
   */
  public String getFirstName() {
    return firstName;
  }

  /**
   * @return the lastName
   */
  public String getLastName() {
    return lastName;
  }

  /**
   * @return the email
   */
  public String getEmail() {
    return email;
  }

  /**
   * @return the address
   */
  public String getAddress() {
    return address;
  }

  /**
   * @return the username
   */
  public String getUsername() {
    return username;
  }

  /**
   * @return the createdAt
   */
  public String getCreatedAt() {
    return createdAt;
  }

  /**
   * @return the roles
   */
  public String getRoles() {
    return roles;
  }

}
