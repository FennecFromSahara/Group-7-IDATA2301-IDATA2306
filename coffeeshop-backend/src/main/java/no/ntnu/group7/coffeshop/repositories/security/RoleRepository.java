package no.ntnu.group7.coffeshop.repositories.security;

import org.springframework.data.jpa.repository.JpaRepository;

import no.ntnu.group7.coffeshop.model.security.Role;

public interface RoleRepository extends JpaRepository<Role, Long> {
  Role findOneByName(String name);
}
