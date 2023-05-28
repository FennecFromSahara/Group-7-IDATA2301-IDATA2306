package no.ntnu.group7.coffeeshop.dto;

import io.swagger.v3.oas.annotations.media.Schema;

@Schema(description = "Represents a DTO for changing password")
public class ChangePasswordDto {
  @Schema(description = "The current password")
  private String currentPassword;
  @Schema(description = "The new password")
  private String newPassword;
  @Schema(description = "The new password from a different input")
  private String confirmPassword;

  public ChangePasswordDto(String currentPassword, String newPassword, String confirmPassword) {
    this.currentPassword = currentPassword;
    this.newPassword = newPassword;
    this.confirmPassword = confirmPassword;
  }

  /**
   * @return the newPassword
   */
  public String getNewPassword() {
    return newPassword;
  }

  /**
   * @return the confirmPassword
   */
  public String getConfirmPassword() {
    return confirmPassword;
  }

  /**
   * @return the currentPassword
   */
  public String getCurrentPassword() {
    return currentPassword;
  }

}