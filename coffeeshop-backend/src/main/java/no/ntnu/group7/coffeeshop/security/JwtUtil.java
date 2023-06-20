package no.ntnu.group7.coffeeshop.security;

import io.jsonwebtoken.Claims;
import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.SignatureAlgorithm;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.stereotype.Component;

import java.util.Date;
import java.util.function.Function;

/**
 * Code adapted from:
 * https://github.com/strazdinsg/app-dev/blob/main/security-demos/07-backend-frontend-jwt-auth/backend/src/main/java/no/ntnu/security/JwtUtil.java
 * 
 * JwtUtil class is a utility class for handling JWT tokens.
 * It provides methods to generate, validate, and extract information from JWT
 * tokens.
 * 
 * Code modified from https://youtu.be/X80nJ5T7YpE
 */
@Component
public class JwtUtil {
  @Value("${jwt_secret_key}")
  private String SECRET_KEY;
  /**
   * Key inside JWT token where user roles is stored
   */
  private static final String JWT_AUTH_KEY = "roles";
  /**
   * Key inside JWT token where user id is stored
   */
  private static final String JWT_ID_KEY = "id";

  /**
   * Generates a JWT token for an authenticated user.
   *
   * @param userDetails Object containing user details
   * @return JWT token string
   */
  public String generateToken(UserDetails userDetails) {
    final long TIME_NOW = System.currentTimeMillis();
    final long MILLISECONDS_IN_24_HOURS = 60 * 60 * 24000;
    final long TIME_AFTER_24_HOURS = TIME_NOW + MILLISECONDS_IN_24_HOURS;

    return Jwts.builder()
        .setSubject(userDetails.getUsername())
        .claim(JWT_AUTH_KEY, userDetails.getAuthorities())
        .claim(JWT_ID_KEY, ((AccessUserDetails) userDetails).getUserId())
        .setIssuedAt(new Date(TIME_NOW))
        .setExpiration(new Date(TIME_AFTER_24_HOURS))
        .signWith(SignatureAlgorithm.HS256, SECRET_KEY)
        .compact();
  }

  /**
   * Finds the username from a JWT token.
   *
   * @param token JWT token
   * @return Username
   */
  public String extractUsername(String token) {
    return extractClaim(token, Claims::getSubject);
  }

  /**
   * Checks if a token is valid for a given user.
   *
   * @param token       Token to validate
   * @param userDetails Object containing user details
   * @return True if the token matches the current user and is still valid
   */
  public Boolean validateToken(String token, UserDetails userDetails) {
    final String username = extractUsername(token);
    return username.equals(userDetails.getUsername()) && !isTokenExpired(token);
  }

  private Date extractExpiration(String token) {
    return extractClaim(token, Claims::getExpiration);
  }

  private <T> T extractClaim(String token, Function<Claims, T> claimsResolver) {
    final Claims claims = extractAllClaims(token);
    return claimsResolver.apply(claims);
  }

  private Claims extractAllClaims(String token) {
    return Jwts.parser().setSigningKey(SECRET_KEY).parseClaimsJws(token).getBody();
  }

  private Boolean isTokenExpired(String token) {
    return extractExpiration(token).before(new Date());
  }
}
