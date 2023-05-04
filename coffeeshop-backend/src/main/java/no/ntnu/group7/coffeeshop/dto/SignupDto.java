package no.ntnu.group7.coffeeshop.dto;

/**
 * Data transfer object (DTO) for data from the sign-up form.
 */
public class SignupDto {
  private final String username;
  private final String password;
  private final String firstName;
  private final String lastName;
  private final String email;
  private final String address;

  /**
   * Constructs a new SignupDto with the specified username, password, first name,
   * last name, email, and address.
   *
   * @param username  The unique username for the user.
   * @param password  The password for the user account.
   * @param firstName The user's first name.
   * @param lastName  The user's last name.
   * @param email     The user's email address.
   * @param address   The user's physical address.
   */
  public SignupDto(String username, String password, String firstName, String lastName, String email, String address) {
    this.username = username;
    this.password = password;
    this.firstName = firstName;
    this.lastName = lastName;
    this.email = email;
    this.address = address;
  }

  public String getUsername() {
    return username;
  }

  public String getPassword() {
    return password;
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
