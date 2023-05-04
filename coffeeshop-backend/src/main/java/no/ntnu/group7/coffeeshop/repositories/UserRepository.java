package no.ntnu.group7.coffeeshop.repositories;

import org.springframework.data.jpa.repository.JpaRepository;

import no.ntnu.group7.coffeeshop.model.User;

import java.util.Optional;

/**
 * Repository interface for accessing User data in the database.
 * Spring will auto-generate necessary methods.
 */
public interface UserRepository extends JpaRepository<User, Long> {
  Optional<User> findByUsername(String username);
}
