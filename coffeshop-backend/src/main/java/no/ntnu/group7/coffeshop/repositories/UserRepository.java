package no.ntnu.group7.coffeshop.repositories;

import org.springframework.data.jpa.repository.JpaRepository;

import no.ntnu.group7.coffeshop.model.security.User;

/**
 * Repository interface for accessing Customer data in the database.
 * Spring will auto-generate necessary methods.
 */
public interface UserRepository extends JpaRepository<User, Integer> {

}
