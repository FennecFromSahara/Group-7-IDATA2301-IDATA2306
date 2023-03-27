package no.ntnu.group7.coffeshop.repositories.certs;

import org.springframework.data.jpa.repository.JpaRepository;

import no.ntnu.group7.coffeshop.model.certs.Role;

public interface RoleRepository extends JpaRepository<Role, Long> {
  Role findOneByName(String name);
}
