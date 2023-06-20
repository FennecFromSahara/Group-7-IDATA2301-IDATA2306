package no.ntnu.group7.coffeeshop.security;

import io.jsonwebtoken.JwtException;
import jakarta.servlet.FilterChain;
import jakarta.servlet.ServletException;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.web.authentication.WebAuthenticationDetailsSource;
import org.springframework.stereotype.Component;
import org.springframework.web.filter.OncePerRequestFilter;

import java.io.IOException;

/**
 * Code adapted from:
 * https://github.com/strazdinsg/app-dev/blob/main/security-demos/07-backend-frontend-jwt-auth/backend/src/main/java/no/ntnu/security/JwtRequestFilter.java
 * 
 * JwtRequestFilter class is a filter that is applied to all HTTP requests and
 * checks for a valid JWT token in the 'Authorization: Bearer ...' header. It
 * extends OncePerRequestFilter provided by Spring Security.
 */
@Component
public class JwtRequestFilter extends OncePerRequestFilter {
  private final static Logger logger = LoggerFactory.getLogger(JwtRequestFilter.class.getSimpleName());
  @Autowired
  private UserDetailsService userDetailsService;

  @Autowired
  private JwtUtil jwtUtil;

  /**
   * Filters incoming requests, validating JWT tokens if present, and setting
   * authentication context for valid tokens.
   *
   * @param request     HTTP request
   * @param response    HTTP response
   * @param filterChain Filter chain to continue with other filters
   * @throws ServletException If a Servlet error occurs
   * @throws IOException      If an I/O error occurs
   */
  @Override
  protected void doFilterInternal(HttpServletRequest request, HttpServletResponse response, FilterChain filterChain)
      throws ServletException, IOException {
    final String authorizationHeader = request.getHeader("Authorization");
    String username = null;
    String jwt = null;
    try {
      if (authorizationHeader != null && authorizationHeader.startsWith("Bearer ")) {
        jwt = authorizationHeader.substring(7);
        username = jwtUtil.extractUsername(jwt);
      }

      if (username != null && SecurityContextHolder.getContext().getAuthentication() == null) {
        UserDetails userDetails = userDetailsService.loadUserByUsername(username);
        if (jwtUtil.validateToken(jwt, userDetails)) {
          UsernamePasswordAuthenticationToken upat = new UsernamePasswordAuthenticationToken(
              userDetails, null, userDetails.getAuthorities());
          upat.setDetails(new WebAuthenticationDetailsSource().buildDetails(request));
          SecurityContextHolder.getContext().setAuthentication(upat);
        }
      }
    } catch (JwtException ex) {
      logger.info("Error while parsing JWT token: " + ex.getMessage());
    }
    filterChain.doFilter(request, response);
  }
}
