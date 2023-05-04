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

  /**
   * Constructs a new UserProfileDto with the specified user ID, first name, last
   * name, email, and address.
   *
   * @param id        The unique identifier for the user.
   * @param firstName The user's first name.
   * @param lastName  The user's last name.
   * @param email     The user's email address.
   * @param address   The user's physical address.
   */
  public UserProfileDto(long id, String firstName, String lastName, String email, String address) {
    this.id = id;
    this.firstName = firstName;
    this.lastName = lastName;
    this.email = email;
    this.address = address;
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
}
