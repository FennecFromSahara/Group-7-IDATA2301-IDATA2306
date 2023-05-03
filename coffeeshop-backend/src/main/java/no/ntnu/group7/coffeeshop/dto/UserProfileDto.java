package no.ntnu.group7.coffeeshop.dto;

/**
 * Data transfer object (DTO) for submitting changes to user profile data.
 */
public class UserProfileDto {
  private long id;
  private String firstName;
  private String lastName;
  private String email;
  private String address;

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
