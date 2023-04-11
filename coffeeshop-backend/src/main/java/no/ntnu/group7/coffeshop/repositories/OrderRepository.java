package no.ntnu.group7.coffeshop.repositories;

import org.springframework.data.jpa.repository.JpaRepository;
import no.ntnu.group7.coffeshop.model.Order;

/**
 * Repository interface for accessing Order data in the database.
 * Spring will auto-generate necessary methods.
 */
public interface OrderRepository extends JpaRepository<Order, Integer> {

}
