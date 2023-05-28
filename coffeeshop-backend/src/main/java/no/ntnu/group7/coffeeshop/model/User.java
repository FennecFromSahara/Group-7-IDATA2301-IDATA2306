package no.ntnu.group7.coffeeshop.model;

import jakarta.persistence.*;

import java.time.LocalDateTime;
import java.time.ZoneId;
import java.util.ArrayList;
import java.util.Date;
import java.util.Iterator;
import java.util.LinkedHashSet;
import java.util.List;
import java.util.Set;

import com.fasterxml.jackson.annotation.JsonManagedReference;

/**
 * User model class that represents a user in the coffee shop system. This class
 * is responsible for
 * storing the user's basic information, such as username, password, first name,
 * last name, email,
 * address, and account status. It is also responsible for managing user roles
 * and associations
 * with other entities such as orders and shopping cart products. It is mapped
 * to the "users"
 * table in the database.
 */
@Entity
@Table(name = "users")
public class User {
  @Id
  @GeneratedValue(strategy = GenerationType.IDENTITY)
  private long id;

  @Column(unique = true, nullable = false)
  private String username;

  @Column(nullable = false)
  private String password;

  @Column(nullable = false)
  private String firstName;

  @Column(nullable = false)
  private String lastName;

  @Column(unique = true, nullable = false)
  private String email;

  @Column(nullable = false)
  private String address;

  private boolean active = true;

  @Temporal(TemporalType.TIMESTAMP)
  @Column(name = "created_at")
  private Date createdAt;

  @ManyToMany(fetch = FetchType.EAGER)
  @JoinTable(name = "user_roles", joinColumns = @JoinColumn(name = "user_id"), inverseJoinColumns = @JoinColumn(name = "role_id"))
  private Set<Role> roles = new LinkedHashSet<>();

  @OneToMany(mappedBy = "user", cascade = CascadeType.ALL, orphanRemoval = true)
  @JsonManagedReference("user-review")
  private List<Review> reviews = new ArrayList<>();

  /**
   * Empty constructor needed for JPA
   */
  public User() {
  }

  /**
   * Constructs a new User with the specified username, password, first name, last
   * name, email, and address.
   *
   * @param username  Username of the user.
   * @param password  Password of the user.
   * @param firstName First name of the user.
   * @param lastName  Last name of the user.
   * @param email     Email of the user.
   * @param address   Address of the user.
   */
  public User(String username, String password, String firstName, String lastName, String email, String address) {
    this.username = username;
    this.password = password;
    this.firstName = firstName;
    this.lastName = lastName;
    this.email = email;
    this.address = address;
    this.createdAt = Date.from(LocalDateTime.now().atZone(ZoneId.systemDefault()).toInstant());
  }

  /**
   * @return the id
   */
  public long getId() {
    return id;
  }

  /**
   * @param id the id to set
   */
  public void setId(long id) {
    this.id = id;
  }

  /**
   * @return the username
   */
  public String getUsername() {
    return username;
  }

  /**
   * @param username the username to set
   */
  public void setUsername(String username) {
    this.username = username;
  }

  /**
   * @return the password
   */
  public String getPassword() {
    return password;
  }

  /**
   * @param password the password to set
   */
  public void setPassword(String password) {
    this.password = password;
  }

  /**
   * @return the firstName
   */
  public String getFirstName() {
    return firstName;
  }

  /**
   * @param firstName the firstName to set
   */
  public void setFirstName(String firstName) {
    this.firstName = firstName;
  }

  /**
   * @return the lastName
   */
  public String getLastName() {
    return lastName;
  }

  /**
   * @param lastName the lastName to set
   */
  public void setLastName(String lastName) {
    this.lastName = lastName;
  }

  /**
   * @return the email
   */
  public String getEmail() {
    return email;
  }

  /**
   * @param email the email to set
   */
  public void setEmail(String email) {
    this.email = email;
  }

  /**
   * @return the address
   */
  public String getAddress() {
    return address;
  }

  /**
   * @param address the address to set
   */
  public void setAddress(String address) {
    this.address = address;
  }

  /**
   * @return the createdAt
   */
  public Date getCreatedAt() {
    return createdAt;
  }

  /**
   * @param createdAt the createdAt to set
   */
  public void setCreatedAt(Date createdAt) {
    this.createdAt = createdAt;
  }

  /**
   * @return the roles
   */
  public Set<Role> getRoles() {
    return roles;
  }

  /**
   * @param roles the roles to set
   */
  public void setRoles(Set<Role> roles) {
    this.roles = roles;
  }

  /**
   * Add a role to the user
   *
   * @param role Role to add
   */
  public void addRole(Role role) {
    roles.add(role);
  }

  /**
   * Removes a role from a user
   * 
   * @param role Role to remove
   */
  public void removeRole(Role role) {
    roles.remove(role);
  }

  /**
   * Check if this user is an admin
   *
   * @return True if the user has admin role, false otherwise
   */
  public boolean isAdmin() {
    return this.hasRole("ROLE_ADMIN");
  }

  /**
   * Check if the user has a specified role
   *
   * @param roleName Name of the role
   * @return True if the user has the role, false otherwise.
   */
  public boolean hasRole(String roleName) {
    boolean found = false;
    Iterator<Role> it = roles.iterator();
    while (!found && it.hasNext()) {
      Role role = it.next();
      if (role.getName().equals(roleName)) {
        found = true;
      }
    }
    return found;
  }

  /**
   * @return the reviews
   */
  public List<Review> getReviews() {
    return reviews;
  }

  /**
   * @param reviews the reviews to set
   */
  public void setReviews(List<Review> reviews) {
    this.reviews = reviews;
  }

  /**
   * @return the active
   */
  public boolean isActive() {
    return active;
  }

  /**
   * @param active the active to set
   */
  public void setActive(boolean active) {
    this.active = active;
  }

}
