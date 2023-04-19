package no.ntnu.group7.coffeeshop;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.context.event.ApplicationReadyEvent;
import org.springframework.context.ApplicationListener;
import org.springframework.stereotype.Component;

import no.ntnu.group7.coffeeshop.model.Product;
import no.ntnu.group7.coffeeshop.model.Role;
import no.ntnu.group7.coffeeshop.model.User;
import no.ntnu.group7.coffeeshop.repositories.ProductRepository;
import no.ntnu.group7.coffeeshop.repositories.RoleRepository;
import no.ntnu.group7.coffeeshop.repositories.UserRepository;

import java.util.LinkedHashSet;
import java.util.Set;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

/**
 * A class which inserts some dummy data into the database, when Spring Boot app
 * has started.
 */
@Component
public class DummyDataInitializer implements ApplicationListener<ApplicationReadyEvent> {
  @Autowired
  private UserRepository userRepository;

  @Autowired
  private RoleRepository roleRepository;

  @Autowired
  private ProductRepository productRepository;

  private final Logger logger = LoggerFactory.getLogger("DummyInit");

  /**
   * This method is called when the application is ready (loaded)
   *
   * @param event Event which we don't use :)
   */
  @Override
  public void onApplicationEvent(ApplicationReadyEvent event) {
    if (userRepository.count() == 0) {
      logger.info("Importing test users...");

      /* The passwords are hashed using bcrypt */
      User testUser = new User("testUser",
          "$2a$12$AIbp1s0f5REEJ1Ck7jNlGOcfiApTge164eT9mCxREtjHoNbnv6B2u", "FirstName",
          "LastName", "email@email.com", "Test station");
      User adminUser = new User("admin",
          "$2a$12$j7zoEDLcKGeNfF/V8eVVVuDV6gYJBsSVmREZfyUN7jErSQV.Ic1Ba", "Admin",
          "King", "admin@mail.com", "Heaven");

      Role userRole = new Role("ROLE_USER");
      Role adminRole = new Role("ROLE_ADMIN");
      Role guestRole = new Role("ROLE_GUEST");

      Set<Role> userRoles = new LinkedHashSet<>();
      userRoles.add(userRole);
      userRoles.add(guestRole);

      testUser.setRoles(userRoles);
      adminUser.setRoles(userRoles);
      adminUser.addRole(adminRole);

      roleRepository.saveAll(userRoles);
      roleRepository.save(adminRole);

      userRepository.save(adminUser);
      userRepository.save(testUser);
      logger.info("DONE importing test products");
    } else {
      logger.info("Users already in the database, not importing anything");
    }

    if (productRepository.count() == 0) {
      logger.info("Importing test products...");

      Product brazilianCoffee = new Product("Brazilian coffee", 80, "ground, 500 grams");
      Product greenTea = new Product("Green tea", 50, "200 grams");
      Product peruCoffeeBeans = new Product("Peru coffee beans", 120, "500 grams");

      productRepository.save(brazilianCoffee);
      productRepository.save(greenTea);
      productRepository.save(peruCoffeeBeans);

      logger.info("DONE importing test products");
    } else {
      logger.info("Products already in the database, not importing anything");
    }
  }
}
