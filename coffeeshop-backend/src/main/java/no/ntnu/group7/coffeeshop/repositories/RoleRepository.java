package no.ntnu.group7.coffeeshop.repositories;

import org.springframework.data.jpa.repository.JpaRepository;

import no.ntnu.group7.coffeeshop.model.Role;

/**
 * Code copied from:
 * https://github.com/strazdinsg/app-dev/blob/main/security-demos/07-backend-frontend-jwt-auth/backend/src/main/java/no/ntnu/repositories/RoleRepository.java
 * 
 * Repository interface for accessing Role data in the database.
 * Spring will auto-generate necessary methods.
 */
public interface RoleRepository extends JpaRepository<Role, Long> {

  Role findByName(String name);

}
