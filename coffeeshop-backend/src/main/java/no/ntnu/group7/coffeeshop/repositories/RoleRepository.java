package no.ntnu.group7.coffeeshop.repositories;

import org.springframework.data.jpa.repository.JpaRepository;

import no.ntnu.group7.coffeeshop.model.Role;

/**
 * Repository interface for accessing Role data in the database.
 * Spring will auto-generate necessary methods.
 */
public interface RoleRepository extends JpaRepository<Role, Long> {
  Role findOneByName(String name);
}
