package no.ntnu.group7.coffeeshop.repositories;

import org.springframework.data.jpa.repository.JpaRepository;

import no.ntnu.group7.coffeeshop.model.User;

import java.util.Optional;

public interface UserRepository extends JpaRepository<User, Long> {
  Optional<User> findByUsername(String username);
}
