package no.ntnu.group7.coffeeshop.security;

import org.springframework.context.annotation.Configuration;
import org.springframework.web.servlet.config.annotation.CorsRegistry;
import org.springframework.web.servlet.config.annotation.WebMvcConfigurer;

/**
 * CorsConfiguration class enables CORS (Cross-Origin Resource Sharing) for the
 * application. This class implements WebMvcConfigurer interface provided by
 * Spring.
 */
@Configuration
public class CorsConfiguration implements WebMvcConfigurer {

  /**
   * Adds CORS mapping to the registry to allow specific origins, methods, and
   * headers.
   *
   * @param registry The registry to which the CORS mapping is added.
   */
  @Override
  public void addCorsMappings(CorsRegistry registry) {
    registry.addMapping("/**")
        .allowedOrigins("http://localhost:3000")
        .allowedMethods("GET", "POST", "PUT", "DELETE", "OPTIONS")
        .allowedHeaders("*")
        .allowCredentials(true);
  }
}