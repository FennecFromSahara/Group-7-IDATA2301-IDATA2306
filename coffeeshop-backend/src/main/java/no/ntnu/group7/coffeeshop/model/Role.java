package no.ntnu.group7.coffeeshop.model;

import jakarta.persistence.*;
import java.util.LinkedHashSet;
import java.util.Set;

/**
 * Represents a user role (admin, user, guest). This class is responsible
 * for storing the role's name and its associated users. It is mapped to the
 * "roles" table in the database.
 */
@Entity
@Table(name = "roles")
public class Role {
  @Id
  @GeneratedValue
  private Long id;

  @Column(unique = true, nullable = false)
  private String name;

  @ManyToMany(mappedBy = "roles")
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

  /**
   * @return the id
   */
  public Long getId() {
    return id;
  }

  /**
   * @param id the id to set
   */
  public void setId(Long id) {
    this.id = id;
  }

  /**
   * @return the name
   */
  public String getName() {
    return name;
  }

  /**
   * @param name the name to set
   */
  public void setName(String name) {
    this.name = name;
  }

  /**
   * @return the users
   */
  public Set<User> getUsers() {
    return users;
  }

  /**
   * @param users the users to set
   */
  public void setUsers(Set<User> users) {
    this.users = users;
  }

}
