package no.ntnu.group7.coffeeshop.security;

import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.userdetails.UserDetails;

import no.ntnu.group7.coffeeshop.model.Role;
import no.ntnu.group7.coffeeshop.model.User;

import java.util.*;

/**
 * Code adapted from:
 * https://github.com/strazdinsg/app-dev/blob/main/security-demos/07-backend-frontend-jwt-auth/backend/src/main/java/no/ntnu/security/AccessUserDetails.java
 * 
 * Contains authentication information, needed by UserDetailsService.
 */
public class AccessUserDetails implements UserDetails {
  private final String username;
  private final String password;
  private final boolean isActive;
  private final Long userId;
  private final Set<GrantedAuthority> authorities = new HashSet<>();

  /**
   * Constructs AccessUserDetails instance based on the given User object.
   *
   * @param user The User object containing authentication information.
   */
  public AccessUserDetails(User user) {
    this.username = user.getUsername();
    this.password = user.getPassword();
    this.isActive = user.isActive();
    this.userId = user.getId();
    this.convertRoles(user.getRoles());
  }

  /**
   * Converts roles from Role objects to SimpleGrantedAuthority objects
   * and stores them in the authorities set.
   *
   * @param roles The set of roles associated with the user.
   */
  private void convertRoles(Set<Role> roles) {
    authorities.clear();
    for (Role role : roles) {
      authorities.add(new SimpleGrantedAuthority(role.getName()));
    }
  }

  @Override
  public Collection<? extends GrantedAuthority> getAuthorities() {
    return authorities;
  }

  @Override
  public String getPassword() {
    return password;
  }

  @Override
  public String getUsername() {
    return username;
  }

  @Override
  public boolean isAccountNonExpired() {
    return isActive;
  }

  @Override
  public boolean isAccountNonLocked() {
    return isActive;
  }

  @Override
  public boolean isCredentialsNonExpired() {
    return isActive;
  }

  @Override
  public boolean isEnabled() {
    return true;
  }

  /**
   * Returns the user's unique identifier (id).
   *
   * @return The user's unique identifier (id).
   */
  public Long getUserId() {
    return userId;
  }
}
