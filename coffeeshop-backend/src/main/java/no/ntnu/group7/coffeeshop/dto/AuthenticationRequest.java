package no.ntnu.group7.coffeeshop.dto;

/**
 * Represents the data that the user will send in the login request.
 */
public class AuthenticationRequest {
  private String username;
  private String password;

  /**
   * Constructor for creating an authentication request.
   * 
   * @param username The username of the user
   * @param password The password of the user
   */
  public AuthenticationRequest(String username, String password) {
    this.username = username;
    this.password = password;
  }

  public String getUsername() {
    return username;
  }

  public void setUsername(String username) {
    this.username = username;
  }

  public String getPassword() {
    return password;
  }

  public void setPassword(String password) {
    this.password = password;
  }
}
