package no.ntnu.group7.coffeshop.repositories.certs;

import org.springframework.data.jpa.repository.JpaRepository;

import no.ntnu.group7.coffeshop.model.certs.User;

import java.util.Optional;

public interface UserRepository extends JpaRepository<User, Long> {
  Optional<User> findByUsername(String username);
}
