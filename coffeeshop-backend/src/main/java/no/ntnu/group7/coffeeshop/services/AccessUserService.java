package no.ntnu.group7.coffeeshop.services;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContext;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.security.crypto.bcrypt.BCrypt;
import org.springframework.stereotype.Service;

import no.ntnu.group7.coffeeshop.dto.UserProfileDto;
import no.ntnu.group7.coffeeshop.model.Role;
import no.ntnu.group7.coffeeshop.model.User;
import no.ntnu.group7.coffeeshop.repositories.RoleRepository;
import no.ntnu.group7.coffeeshop.repositories.UserRepository;
import no.ntnu.group7.coffeeshop.security.AccessUserDetails;

import java.util.List;
import java.util.Optional;

/**
 * AccessUserService is a service layer class that provides functionality
 * related to user authentication, management, and profile updates in the coffee
 * shop application. It implements the UserDetailsService interface for Spring
 * Security, which is used to load user-specific data during authentication.
 */
@Service
public class AccessUserService implements UserDetailsService {
  private static final int MIN_PASSWORD_LENGTH = 6;
  @Autowired
  UserRepository userRepository;
  @Autowired
  RoleRepository roleRepository;

  /**
   * Loads user-specific data during authentication by retrieving a user from the
   * database using their username and creating an AccessUserDetails object.
   *
   * @param username the username of the user to retrieve
   * @return UserDetails object containing user details required for
   *         authentication
   * @throws UsernameNotFoundException if a user with the specified username is
   *                                   not found
   */
  @Override
  public UserDetails loadUserByUsername(String username) throws UsernameNotFoundException {
    Optional<User> user = userRepository.findByUsername(username);
    if (user.isPresent()) {
      return new AccessUserDetails(user.get());
    } else {
      throw new UsernameNotFoundException("User " + username + "not found");
    }
  }

  /**
   * Returns the currently authenticated user for the current session.
   *
   * @return User object representing the currently authenticated user, or null if
   *         no user is logged in
   */
  public User getSessionUser() {
    SecurityContext securityContext = SecurityContextHolder.getContext();
    Authentication authentication = securityContext.getAuthentication();
    String username = authentication.getName();
    return userRepository.findByUsername(username).orElse(null);
  }

  /**
   * Checks if user with given username exists in the database.
   *
   * @param username Username of the user to check, case-sensitive
   * @return True if user exists, false otherwise
   */
  private boolean userExists(String username) {
    try {
      loadUserByUsername(username);
      return true;
    } catch (UsernameNotFoundException ex) {
      return false;
    }
  }

  /**
   * Attempts to create a new user by checking for potential issues and, if
   * successful, creating a new user in the database.
   *
   * @param username  the desired username for the new user
   * @param password  the plaintext password for the new user
   * @param firstName the first name of the new user
   * @param lastName  the last name of the new user
   * @param email     the email address of the new user
   * @param address   the physical address of the new user
   * @return null if the user was created successfully, or an error message
   *         describing the issue
   */
  public String tryCreateNewUser(String username, String password, String firstName, String lastName, String email,
      String address) {
    String errorMessage;
    if ("".equals(username)) {
      errorMessage = "Username can't be empty";
    } else if (userExists(username)) {
      errorMessage = "Username already taken";
    } else {
      errorMessage = checkPasswordRequirements(password);
      if (errorMessage == null) {
        createUser(username, password, firstName, lastName, email, address);
      }
    }
    return errorMessage;
  }

  /**
   * Checks if password matches the requirements.
   *
   * @param password A password to check
   * @return null if all OK, error message on error
   */
  private String checkPasswordRequirements(String password) {
    String errorMessage = null;
    if (password == null || password.length() == 0) {
      errorMessage = "Password can't be empty";
    } else if (password.length() < MIN_PASSWORD_LENGTH) {
      errorMessage = "Password must be at least " + MIN_PASSWORD_LENGTH + " characters";
    }
    return errorMessage;
  }

  /**
   * Creates a new user in the database.
   *
   * @param username  Username of the new user
   * @param password  Plaintext password of the new user
   * @param firstName First name of the user
   * @param lastName  Last name of the user
   * @param email     Email of the user
   * @param address   Address of the use
   */
  private void createUser(String username, String password, String firstName, String lastName, String email,
      String address) {
    Role userRole = roleRepository.findByName("ROLE_USER");
    if (userRole != null) {
      User user = new User(username, createHash(password), firstName, lastName, email, address);
      user.addRole(userRole);
      userRepository.save(user);
    }
  }

  /**
   * Creates a secure hash of a password.
   *
   * @param password Plaintext password
   * @return BCrypt hash, with random salt
   */
  private String createHash(String password) {
    return BCrypt.hashpw(password, BCrypt.gensalt());
  }

  /**
   * Updates a user's profile information based on the data provided in the
   * UserProfileDto object.
   *
   * @param user        the user to update
   * @param profileData a UserProfileDto object containing the updated profile
   *                    data
   * @return true on successful update, false otherwise
   */
  public boolean updateProfile(User user, UserProfileDto profileData) {
    user.setFirstName(profileData.getFirstName());
    user.setLastName(profileData.getLastName());
    user.setEmail(profileData.getEmail());
    user.setAddress(profileData.getAddress());
    userRepository.save(user);
    return true;
  }

  /**
   * Fetches all users from the database and returns them as a list.
   *
   * @return a list of all users in the database
   */
  public List<User> getAllUsers() {
    return userRepository.findAll();
  }

  /**
   * Gives a user the ROLE_ADMIN role.
   * 
   * @param user user to make an admin.
   */
  public void makeAdmin(User user) {
    if (!user.isAdmin()) {
      Role adminRole = roleRepository.findByName("ROLE_ADMIN");
      if (adminRole == null) {
        adminRole = new Role("ROLE_ADMIN");
        roleRepository.save(adminRole);
      }
      user.addRole(adminRole);
      userRepository.save(user);
    }
  }

  /**
   * Fetches a user from the database using their username.
   *
   * @param username the username of the user to retrieve
   * @return User object if user is found, null otherwise
   */
  public User getUserByUsername(String username) {
    return userRepository.findByUsername(username).orElse(null);
  }
}
