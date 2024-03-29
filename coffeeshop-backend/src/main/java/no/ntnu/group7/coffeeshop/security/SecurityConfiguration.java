package no.ntnu.group7.coffeeshop.security;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.http.HttpMethod;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.config.annotation.authentication.builders.AuthenticationManagerBuilder;
import org.springframework.security.config.annotation.authentication.configuration.AuthenticationConfiguration;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.http.SessionCreationPolicy;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.security.web.SecurityFilterChain;
import org.springframework.security.web.authentication.UsernamePasswordAuthenticationFilter;

/**
 * Code adapted from: 
 * https://github.com/strazdinsg/app-dev/blob/main/security-demos/07-backend-frontend-jwt-auth/backend/src/main/java/no/ntnu/security/SecurityConfiguration.java
 * 
 * Creates AuthenticationManager - set up authentication type.
 */
@Configuration
public class SecurityConfiguration {
  /**
   * A service providing our users from the database
   */
  @Autowired
  private UserDetailsService userDetailsService;
  @Autowired
  private JwtRequestFilter jwtRequestFilter;

  /**
   * This method will be called automatically by the framework to find out what
   * authentication to use.
   * Here we tell that we want to load users from a database
   *
   * @param auth Authentication builder
   * @throws Exception
   */
  @Autowired
  protected void configure(AuthenticationManagerBuilder auth) throws Exception {
    auth.userDetailsService(userDetailsService);
  }

  /**
   * This method will be called automatically by the framework to find out what
   * authentication to use.
   *
   * @param http HttpSecurity setting builder
   * @throws Exception
   */
  @Bean
  public SecurityFilterChain configureAuthorizationFilterChain(HttpSecurity http) throws Exception {
    // Allow JWT authentication
    http.cors().and().csrf().disable()
        .authorizeHttpRequests()
        // Authentication
        .requestMatchers("/api/authenticate").permitAll()
        .requestMatchers("/api/signup").permitAll()
        // Swagger docs
        .requestMatchers("/api-docs").permitAll()
        .requestMatchers("/v3/api-docs").permitAll()
        .requestMatchers("/v3/api-docs/**").permitAll()
        .requestMatchers("/swagger-ui").permitAll()
        .requestMatchers("/swagger-ui/**").permitAll()
        // Products
        .requestMatchers(HttpMethod.GET, "/api/products").permitAll()
        .requestMatchers(HttpMethod.GET, "/api/products/*").permitAll()
        .requestMatchers(HttpMethod.POST, "/api/products/*/add-review").permitAll()
        .requestMatchers(HttpMethod.GET, "/api/products/*/categories").permitAll()
        .requestMatchers(HttpMethod.GET, "/api/products/category/*").permitAll()
        .requestMatchers(HttpMethod.GET, "/api/products/count").permitAll()
        // Categories
        .requestMatchers(HttpMethod.GET, "/api/categories").permitAll()
        .requestMatchers(HttpMethod.GET, "/api/categories/*").permitAll()
        // ShoppingCart
        .requestMatchers(HttpMethod.GET, "/api/shoppingCart").permitAll()
        .requestMatchers(HttpMethod.GET, "/api/shoppingCart/total").permitAll()
        .requestMatchers(HttpMethod.DELETE, "/api/shoppingCart/*").permitAll()
        .requestMatchers(HttpMethod.PATCH, "/api/shoppingCart/quantity").permitAll()
        .requestMatchers(HttpMethod.POST, "/api/shoppingCart/add-to-cart").permitAll()
        .anyRequest().authenticated()
        .and().sessionManagement()
        .sessionCreationPolicy(SessionCreationPolicy.STATELESS)
        .and()
        .addFilterBefore(jwtRequestFilter, UsernamePasswordAuthenticationFilter.class);
    return http.build();
  }

  /**
   * This is needed since Spring Boot 2.0, see
   * https://stackoverflow.com/questions/52243774/consider-defining-a-bean-of-type-org-springframework-security-authentication-au
   *
   * @return
   * @throws Exception
   */
  @Bean
  public AuthenticationManager authenticationManager(AuthenticationConfiguration config) throws Exception {
    return config.getAuthenticationManager();
  }

  /**
   * This method is called to decide what encryption to use for password checking
   *
   * @return The password encryptor
   */
  @Bean
  public PasswordEncoder getPasswordEncoder() {
    return new BCryptPasswordEncoder();
  }
}
