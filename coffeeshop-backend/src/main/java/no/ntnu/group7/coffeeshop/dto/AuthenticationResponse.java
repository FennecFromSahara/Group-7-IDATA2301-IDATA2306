package no.ntnu.group7.coffeeshop.dto;

import io.swagger.v3.oas.annotations.media.Schema;

/**
 * Code adapted from:
 * https://github.com/strazdinsg/app-dev/blob/main/security-demos/07-backend-frontend-jwt-auth/backend/src/main/java/no/ntnu/dto/AuthenticationResponse.java
 * 
 * Data that we will send as a response to the user when the authentication is
 * successful.
 */
@Schema(description = "Represents an authentication response")
public class AuthenticationResponse {
  @Schema(description = "The jwt token")
  private final String jwt;

  /**
   * Constructor for creating an authentication response with a JWT token.
   * 
   * @param jwt The JSON Web Token (JWT) used for authentication
   */
  public AuthenticationResponse(String jwt) {
    this.jwt = jwt;
  }

  /**
   * @return the jwt
   */
  public String getJwt() {
    return jwt;
  }

}
