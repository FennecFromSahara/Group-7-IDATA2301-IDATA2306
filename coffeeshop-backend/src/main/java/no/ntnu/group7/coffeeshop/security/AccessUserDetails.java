package no.ntnu.group7.coffeeshop.security;

import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.userdetails.UserDetails;

import no.ntnu.group7.coffeeshop.model.security.Role;
import no.ntnu.group7.coffeeshop.model.security.User;

import java.util.*;

/**
 * Contains authentication information, needed by UserDetailsService.
 */
public class AccessUserDetails implements UserDetails {
  private final String username;
  private final String password;
  private final boolean isActive;
  private final Set<GrantedAuthority> authorities = new HashSet<>();

  public AccessUserDetails(User user) {
    this.username = user.getUsername();
    this.password = user.getPassword();
    this.isActive = user.isActive();
    this.convertRoles(user.getRoles());
  }

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
}