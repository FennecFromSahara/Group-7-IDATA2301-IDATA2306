package no.ntnu.group7.coffeeshop.controllers;

import no.ntnu.group7.coffeeshop.dto.UserProfileDto;
import no.ntnu.group7.coffeeshop.model.Role;
import no.ntnu.group7.coffeeshop.model.User;
import no.ntnu.group7.coffeeshop.services.AccessUserService;

import java.util.List;
import java.util.stream.Collectors;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

/**
 * REST API controller serving endpoints for users.
 */
@RestController
@CrossOrigin(origins = "http://localhost:3000")
@RequestMapping("/api/users")
public class UserController {

  @Autowired
  private AccessUserService userService;

  /**
   * Handles HTTP GET requests to "/api/users/{username}" and returns profile
   * information for the specified user. If the specified user is not the
   * currently authenticated user, returns a 403 Forbidden response. If the
   * request is not made by an authenticated user, returns a 401 Unauthorized
   * response.
   *
   * @param username The username of the user whose profile is being requested.
   * @return The profile information for the specified user.
   */
  @GetMapping("/{username}")
  public ResponseEntity<?> getProfile(@PathVariable String username) throws InterruptedException {
    User sessionUser = userService.getSessionUser();

    if (sessionUser != null && (sessionUser.getUsername().equals(username) || sessionUser.isAdmin())) {
      User user = userService.getUserByUsername(username);

      List<String> roleNames = user.getRoles().stream()
          .map(Role::getName)
          .collect(Collectors.toList());

      UserProfileDto profile = new UserProfileDto(user.getId(), user.getFirstName(),
          user.getLastName(),
          user.getEmail(), user.getAddress(), user.getUsername(),
          user.getCreatedAt().toString(), String.join(", ", roleNames));

      return new ResponseEntity<>(profile, HttpStatus.OK);
    } else if (sessionUser == null) {
      return new ResponseEntity<>("Profile data accessible only to authenticated users", HttpStatus.UNAUTHORIZED);
    } else {
      return new ResponseEntity<>("Profile data for other users not accessible!", HttpStatus.FORBIDDEN);
    }
  }

  /**
   * Handles HTTP PUT requests to "/api/users/{username}" and updates the profile
   * information for the specified user. If the specified user is not the
   * currently authenticated user, returns a 403 Forbidden response. If the
   * request is not made by an authenticated user, returns a 401 Unauthorized
   * response.
   *
   * @param username    The username of the user whose profile is being updated.
   * @param profileData The updated profile information.
   * @return An HTTP response indicating success or failure of the update
   *         operation.
   */
  @PutMapping("/{username}")
  public ResponseEntity<String> updateProfile(@PathVariable String username, @RequestBody UserProfileDto profileData)
      throws InterruptedException {
    User sessionUser = userService.getSessionUser();

    ResponseEntity<String> response;

    if (sessionUser != null && (sessionUser.getUsername().equals(username) || sessionUser.isAdmin())) {
      if (profileData != null) {
        if (userService.updateProfile(sessionUser, profileData)) {
          response = new ResponseEntity<>("", HttpStatus.OK);
        } else {
          response = new ResponseEntity<>("Could not update Profile data", HttpStatus.INTERNAL_SERVER_ERROR);
        }
      } else {
        response = new ResponseEntity<>("Profile data not supplied", HttpStatus.BAD_REQUEST);
      }
    } else if (sessionUser == null) {
      response = new ResponseEntity<>("Profile data accessible only to authenticated users", HttpStatus.UNAUTHORIZED);
    } else {
      response = new ResponseEntity<>("Profile data for other users not accessible!", HttpStatus.FORBIDDEN);
    }
    return response;
  }

  /**
   * Handles HTTP GET requests to "/api/users" and returns a list of user profile
   * information for all users. If the request is not made by an authenticated
   * admin user, returns a 403 Forbidden response. If the request is not made by
   * an authenticated user, returns a 401 Unauthorized response.
   *
   * @return A list of user profile information for all users.
   */
  @GetMapping("")
  public ResponseEntity<Object> getAllUsers() throws InterruptedException {
    User sessionUser = userService.getSessionUser();

    if (sessionUser != null && sessionUser.isAdmin()) {
      List<User> allUsers = userService.getAllUsers();

      List<UserProfileDto> allUserProfileDtos = allUsers.stream()
          .map(user -> {
            List<String> roleNames = user.getRoles().stream()
                .map(Role::getName)
                .collect(Collectors.toList());
            return new UserProfileDto(user.getId(), user.getFirstName(), user.getLastName(), user.getEmail(),
                user.getAddress(), user.getUsername(), user.getCreatedAt().toString(), String.join(", ", roleNames));
          })
          .collect(Collectors.toList());

      return new ResponseEntity<>(allUserProfileDtos, HttpStatus.OK);
    } else if (sessionUser == null) {
      return new ResponseEntity<>("User data accessible only to authenticated users", HttpStatus.UNAUTHORIZED);
    } else {
      return new ResponseEntity<>("User data accessible only to admin users", HttpStatus.FORBIDDEN);
    }
  }
}
