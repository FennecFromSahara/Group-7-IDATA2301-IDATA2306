package no.ntnu.group7.coffeeshop.dto;

import io.swagger.v3.oas.annotations.media.Schema;

/**
 * Code adapted from:
 * https://github.com/strazdinsg/app-dev/blob/main/security-demos/07-backend-frontend-jwt-auth/backend/src/main/java/no/ntnu/dto/AuthenticationRequest.java
 * 
 * Represents the data that the user will send in the login request.
 */
@Schema(description = "Represents an authentication request")
public class AuthenticationRequest {
  @Schema(description = "The username of the user")
  private String username;
  @Schema(description = "The password of the user")
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

  /**
   * @return the username
   */
  public String getUsername() {
    return username;
  }

  /**
   * @return the password
   */
  public String getPassword() {
    return password;
  }

}
