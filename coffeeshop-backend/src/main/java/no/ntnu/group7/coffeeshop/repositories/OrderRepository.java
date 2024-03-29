package no.ntnu.group7.coffeeshop.repositories;

import org.springframework.data.jpa.repository.JpaRepository;
import no.ntnu.group7.coffeeshop.model.Order;

/**
 * Repository interface for accessing Order data in the database.
 * Spring will auto-generate necessary methods.
 */
public interface OrderRepository extends JpaRepository<Order, Integer> {

}
