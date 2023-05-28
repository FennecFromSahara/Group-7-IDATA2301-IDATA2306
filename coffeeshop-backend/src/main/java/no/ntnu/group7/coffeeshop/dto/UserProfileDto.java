package no.ntnu.group7.coffeeshop.dto;

/**
 * Data transfer object (DTO) for submitting changes and retrieving profile
 * data.
 */
public class UserProfileDto {
  private long id;
  private String firstName;
  private String lastName;
  private String email;
  private String address;
  private String username;
  private String createdAt;
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
