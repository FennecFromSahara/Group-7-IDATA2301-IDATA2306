package no.ntnu.group7.coffeeshop.controllers;

import no.ntnu.group7.coffeeshop.dto.UserProfileDto;
import no.ntnu.group7.coffeeshop.model.Role;
import no.ntnu.group7.coffeeshop.model.User;
import no.ntnu.group7.coffeeshop.repositories.UserRepository;
import no.ntnu.group7.coffeeshop.services.AccessUserService;

import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.Optional;
import java.util.stream.Collectors;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.Parameter;
import io.swagger.v3.oas.annotations.media.Content;
import io.swagger.v3.oas.annotations.media.Schema;
import io.swagger.v3.oas.annotations.responses.ApiResponse;
import io.swagger.v3.oas.annotations.responses.ApiResponses;

/**
 * REST API controller serving endpoints for users.
 */
@RestController
@CrossOrigin(origins = "http://localhost:3000")
@RequestMapping("/api/users")
public class UserController {

  @Autowired
  private AccessUserService userService;

  @Autowired
  private UserRepository userRepository;

  private final Logger logger = LoggerFactory.getLogger("User Controller Logger");

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
  @Operation(summary = "Get one user")
  @ApiResponses({
      @ApiResponse(responseCode = "200", description = "Success", content = @Content(schema = @Schema(implementation = UserProfileDto.class))),
      @ApiResponse(responseCode = "401", description = "Profile data accessible only to authenticated users"),
      @ApiResponse(responseCode = "403", description = "Profile data for other users not accessible!"),
  })
  public ResponseEntity<?> getProfile(
      @Parameter(description = "The username of the user whose profile is being requested") @PathVariable String username)
      throws InterruptedException {
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
  @Operation(summary = "Update one user")
  @ApiResponses({
      @ApiResponse(responseCode = "200", description = "Success", content = @Content(schema = @Schema(implementation = UserProfileDto.class))),
      @ApiResponse(responseCode = "401", description = "User data accessible only to authenticated users"),
      @ApiResponse(responseCode = "403", description = "User data accessible only to admin users")
  })
  public ResponseEntity<?> updateProfile(
      @Parameter(description = "The username of the user whose profile is being updated") @PathVariable String username,
      @Parameter(description = "The updated profile information") @RequestBody UserProfileDto profileData)
      throws InterruptedException {
    User sessionUser = userService.getSessionUser();

    if (sessionUser != null && (sessionUser.getUsername().equals(username) || sessionUser.isAdmin())) {
      logger.info("id: " + profileData.getId() + " username: " + profileData.getUsername());

      User updatedUser = userRepository.findById(profileData.getId()).get();

      updatedUser.setUsername(profileData.getUsername());
      updatedUser.setFirstName(profileData.getFirstName());
      updatedUser.setLastName(profileData.getLastName());
      updatedUser.setEmail(profileData.getEmail());
      updatedUser.setAddress(profileData.getAddress());

      userRepository.save(updatedUser);

      // For the frontend
      List<String> roleNames = updatedUser.getRoles().stream()
          .map(Role::getName)
          .collect(Collectors.toList());

      UserProfileDto responseProfile = new UserProfileDto(updatedUser.getId(), updatedUser.getFirstName(),
          updatedUser.getLastName(),
          updatedUser.getEmail(), updatedUser.getAddress(), updatedUser.getUsername(),
          updatedUser.getCreatedAt().toString(), String.join(", ", roleNames));

      return new ResponseEntity<UserProfileDto>(responseProfile, HttpStatus.OK);
    } else if (sessionUser == null) {
      return new ResponseEntity<>("User data accessible only to authenticated users", HttpStatus.UNAUTHORIZED);
    } else {
      return new ResponseEntity<>("User data accessible only to admin users", HttpStatus.FORBIDDEN);
    }
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
  @Operation(summary = "Get all users")
  @ApiResponses({
      @ApiResponse(responseCode = "200", description = "Success", content = @Content(schema = @Schema(implementation = UserProfileDto.class))),
      @ApiResponse(responseCode = "401", description = "User data accessible only to authenticated users"),
      @ApiResponse(responseCode = "403", description = "User data accessible only to admin users")
  })
  public ResponseEntity<?> getAllUsers() throws InterruptedException {
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

      return new ResponseEntity<List<UserProfileDto>>(allUserProfileDtos, HttpStatus.OK);
    } else if (sessionUser == null) {
      return new ResponseEntity<>("User data accessible only to authenticated users", HttpStatus.UNAUTHORIZED);
    } else {
      return new ResponseEntity<>("User data accessible only to admin users", HttpStatus.FORBIDDEN);
    }
  }

  /**
   * Handles HTTP PUT requests to "/api/users/{username}/make-admin"
   * and assigns the role of 'Admin' to the specified user.
   * If the session user is not an admin or unauthenticated, appropriate
   * HTTP status codes are returned to indicate unauthorized access.
   * 
   * @param username The username of the user to be promoted to an admin role.
   * @return ResponseEntity containing a Map with updated roles of the user
   *         or an error message with appropriate HTTP status code.
   * @throws InterruptedException
   */
  @PutMapping("/{username}/make-admin")
  @Operation(summary = "Give user admin role")
  @ApiResponses({
      @ApiResponse(responseCode = "200", description = "Success", content = @Content(schema = @Schema(implementation = Map.class))),
      @ApiResponse(responseCode = "403", description = "User data accessible only to admin users")
  })
  public ResponseEntity<?> makeAdmin(
      @Parameter(description = "username of account to give admin privileges") @PathVariable String username)
      throws InterruptedException {
    User sessionUser = userService.getSessionUser();

    if (sessionUser != null && sessionUser.isAdmin()) {
      User newAdmin = userService.getUserByUsername(username);

      userService.makeAdmin(newAdmin);

      String newRoles = userService.convertRolesToString(newAdmin.getRoles());

      Map<String, String> response = new HashMap<>();
      response.put("roles", newRoles);

      return new ResponseEntity<>(response, HttpStatus.OK);
    } else {
      return new ResponseEntity<>("User data accessible only to admin users", HttpStatus.FORBIDDEN);
    }
  }

  /**
   * Handles HTTP PUT requests to "/api/users/{username}/remove-admin"
   * and removes the role of 'Admin' from the specified user.
   * If the session user is not an admin or unauthenticated, appropriate
   * HTTP status codes are returned to indicate unauthorized access.
   * 
   * @param username The username of the user from which the admin role is to be
   *                 removed.
   * @return ResponseEntity containing a Map with updated roles of the user
   *         or an error message with appropriate HTTP status code.
   * @throws InterruptedException
   */
  @PutMapping("/{username}/remove-admin")
  @Operation(summary = "Remove admin role from user")
  @ApiResponses({
      @ApiResponse(responseCode = "200", description = "Success", content = @Content(schema = @Schema(implementation = Map.class))),
      @ApiResponse(responseCode = "401", description = "Only authenticated users can remove admin privileges"),
      @ApiResponse(responseCode = "403", description = "User data accessible only to admin users")
  })
  public ResponseEntity<?> removeAdmin(
      @Parameter(description = "username of account to remove admin priveliges from") @PathVariable String username)
      throws InterruptedException {
    User sessionUser = userService.getSessionUser();

    if (sessionUser != null && sessionUser.isAdmin()) {
      User oldAdmin = userService.getUserByUsername(username);

      userService.removeRole(oldAdmin, "ROLE_ADMIN");

      String newRoles = userService.convertRolesToString(oldAdmin.getRoles());

      Map<String, Object> response = new HashMap<>();
      response.put("roles", newRoles);

      return new ResponseEntity<>(response, HttpStatus.OK);
    } else if (sessionUser == null) {
      return new ResponseEntity<>("Only authenticated users can remove admin privileges", HttpStatus.UNAUTHORIZED);
    } else {
      return new ResponseEntity<>("User data accessible only to admin users", HttpStatus.FORBIDDEN);
    }
  }

  /**
   * Handles HTTP DELETE requests to "/api/users/{username}" and deletes an
   * existing user from the database with the specified username. If the user is
   * not found, returns a 404 Not Found response. If the user is not the currently
   * authenticated admin, returns a 403 Forbidden response. If the request is not
   * made by an authenticated user, returns a 401 Unauthorized response.
   *
   * @param username The username of the user to delete.
   * @return A response indicating success or failure of the deletion.
   * @throws InterruptedException
   */
  @DeleteMapping("/{username}")
  @Operation(summary = "Delete user")
  @ApiResponses({
      @ApiResponse(responseCode = "200", description = "Success"),
      @ApiResponse(responseCode = "404", description = "User not found in database"),
      @ApiResponse(responseCode = "401", description = "User data accessible only to authenticated users"),
      @ApiResponse(responseCode = "403", description = "User data accessible only to admin users")
  })
  public ResponseEntity<String> deleteUser(
      @Parameter(description = "The username of the user to delete") @PathVariable String username)
      throws InterruptedException {
    User sessionUser = userService.getSessionUser();

    if (sessionUser != null && sessionUser.isAdmin()) {
      Optional<User> user = userRepository.findByUsername(username);

      if (user.isPresent()) {
        userRepository.deleteById(user.get().getId());
        return new ResponseEntity<>(username + " has been deleted.", HttpStatus.OK);
      } else {
        return new ResponseEntity<>("User not found in database", HttpStatus.NOT_FOUND);
      }
    } else if (sessionUser == null) {
      return new ResponseEntity<>("User data accessible only to authenticated users", HttpStatus.UNAUTHORIZED);
    } else {
      return new ResponseEntity<>("User data accessible only to admin users", HttpStatus.FORBIDDEN);
    }
  }
}
