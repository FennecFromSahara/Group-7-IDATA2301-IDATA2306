package no.ntnu.group7.coffeeshop.controllers;

import no.ntnu.group7.coffeeshop.dto.AuthenticationRequest;
import no.ntnu.group7.coffeeshop.dto.AuthenticationResponse;
import no.ntnu.group7.coffeeshop.dto.ChangePasswordDto;
import no.ntnu.group7.coffeeshop.dto.SignupDto;
import no.ntnu.group7.coffeeshop.model.User;
import no.ntnu.group7.coffeeshop.security.JwtUtil;
import no.ntnu.group7.coffeeshop.services.AccessUserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.BadCredentialsException;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.web.bind.annotation.*;

import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.Parameter;
import io.swagger.v3.oas.annotations.media.Content;
import io.swagger.v3.oas.annotations.media.Schema;
import io.swagger.v3.oas.annotations.responses.ApiResponse;
import io.swagger.v3.oas.annotations.responses.ApiResponses;

/**
 * Controller responsible for authentication.
 */
@CrossOrigin
@RestController
public class AuthenticationController {
  @Autowired
  private AuthenticationManager authenticationManager;
  @Autowired
  private AccessUserService userService;
  @Autowired
  private JwtUtil jwtUtil;

  /**
   * HTTP POST request to /authenticate
   *
   * @param authenticationRequest The request JSON object containing username and
   *                              password
   * @return OK + JWT token; Or UNAUTHORIZED
   */
  @PostMapping("/api/authenticate")
  @Operation(summary = "Try to authenticate")
  @ApiResponses({
      @ApiResponse(responseCode = "200", description = "Success", content = @Content(schema = @Schema(implementation = AuthenticationResponse.class))),
      @ApiResponse(responseCode = "401", description = "Invalid username or password")
  })
  public ResponseEntity<?> authenticate(
      @Parameter(description = "The request JSON object containing username and password") @RequestBody AuthenticationRequest authenticationRequest) {
    try {
      authenticationManager.authenticate(new UsernamePasswordAuthenticationToken(
          authenticationRequest.getUsername(),
          authenticationRequest.getPassword()));
    } catch (BadCredentialsException e) {
      return new ResponseEntity<>("Invalid username or password", HttpStatus.UNAUTHORIZED);
    }
    final UserDetails userDetails = userService.loadUserByUsername(authenticationRequest.getUsername());
    final String jwt = jwtUtil.generateToken(userDetails);
    return ResponseEntity.ok(new AuthenticationResponse(jwt));
  }

  /**
   * This method processes data received from the sign-up form (HTTP POST)
   * 
   * @param signupData DTO containing user details needed for signup
   * @return A response indicating success or failure of the operation.
   */
  @PostMapping("/api/signup")
  @Operation(summary = "Try to signup")
  @ApiResponses({
      @ApiResponse(responseCode = "200", description = "Successful"),
      @ApiResponse(responseCode = "400", description = "Error creating user")
  })
  public ResponseEntity<String> signupProcess(
      @Parameter(description = "DTO containing user details needed for signup") @RequestBody SignupDto signupData) {
    String errorMessage = userService.tryCreateNewUser(signupData.getUsername(), signupData.getPassword(),
        signupData.getFirstName(), signupData.getLastName(), signupData.getEmail(), signupData.getAddress());
    ResponseEntity<String> response;
    if (errorMessage == null) {
      response = new ResponseEntity<>(HttpStatus.OK);
    } else {
      response = new ResponseEntity<>(errorMessage, HttpStatus.BAD_REQUEST);
    }
    return response;
  }

  /**
   * HTTP PATCH request to change password of a user
   * 
   * @param changePasswordData DTO containing details used for changing password
   * @return A response indicating success or failure of the operation.
   */
  @PatchMapping("/api/change_password")
  @Operation(summary = "Change password")
  @ApiResponses({
      @ApiResponse(responseCode = "200", description = "Password updated successfully"),
      @ApiResponse(responseCode = "404", description = "User not found"),
      @ApiResponse(responseCode = "400", description = "Error updating password")
  })
  public ResponseEntity<String> changePassword(
      @Parameter(description = "DTO containing details used for changing password") @RequestBody ChangePasswordDto changePasswordData) {
    User user = userService.getSessionUser();
    if (user == null) {
      return new ResponseEntity<>("User not found", HttpStatus.NOT_FOUND);
    }

    String errorMessage = userService.updatePassword(user, changePasswordData);
    if (errorMessage != null) {
      return new ResponseEntity<>(errorMessage, HttpStatus.BAD_REQUEST);
    }

    return new ResponseEntity<>("Password updated successfully", HttpStatus.OK);
  }
}
