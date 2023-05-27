package no.ntnu.group7.coffeeshop.dto;

public class ChangePasswordDto {
  private String currentPassword;
  private String newPassword;
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