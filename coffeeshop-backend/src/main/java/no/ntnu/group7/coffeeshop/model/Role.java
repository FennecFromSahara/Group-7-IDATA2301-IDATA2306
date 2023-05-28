package no.ntnu.group7.coffeeshop.model;

import jakarta.persistence.*;
import java.util.LinkedHashSet;
import java.util.Set;

import io.swagger.v3.oas.annotations.media.Schema;

/**
 * Represents a user role (admin, user, guest). This class is responsible
 * for storing the role's name and its associated users. It is mapped to the
 * "roles" table in the database.
 */
@Entity
@Table(name = "roles")
@Schema(description = "Represents a user role")
public class Role {
  @Id
  @GeneratedValue
  @Schema(description = "Unique ID")
  private Long id;

  @Column(unique = true, nullable = false)
  @Schema(description = "Name of the role")
  private String name;

  @ManyToMany(mappedBy = "roles")
  @Schema(description = "Set of users who have this role")
  private Set<User> users = new LinkedHashSet<>();

  /**
   * Empty constructor needed for JPA
   */
  public Role() {
  }

  /**
   * Constructs a new Role with the specified name.
   *
   * @param name The name of the role.
   */
  public Role(String name) {
    this.name = name;
  }

  public Long getId() {
    return id;
  }

  public void setId(Long id) {
    this.id = id;
  }

  public Set<User> getUsers() {
    return users;
  }

  public void setUsers(Set<User> users) {
    this.users = users;
  }

  public String getName() {
    return name;
  }

  public void setName(String name) {
    this.name = name;
  }
}
