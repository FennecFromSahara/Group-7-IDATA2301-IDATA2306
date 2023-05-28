package no.ntnu.group7.coffeeshop.dto;

/**
 * Data that we will send as a response to the user when the authentication is
 * successful.
 */
public class AuthenticationResponse {
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
