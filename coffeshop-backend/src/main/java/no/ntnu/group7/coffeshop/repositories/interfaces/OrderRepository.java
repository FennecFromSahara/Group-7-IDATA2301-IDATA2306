package no.ntnu.group7.coffeshop.repositories.interfaces;

import org.springframework.data.repository.CrudRepository;
import no.ntnu.group7.coffeshop.model.Order;

/**
 * Repository interface for accessing Order data in the database.
 * Spring will auto-generate necessary methods.
 */
public interface OrderRepository extends CrudRepository<Order, Integer> {

}
