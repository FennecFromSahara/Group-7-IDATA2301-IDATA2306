package no.ntnu.group7.coffeshop.repositories.interfaces;

import org.springframework.data.repository.CrudRepository;
import no.ntnu.group7.coffeshop.model.Customer;

/**
 * Repository interface for accessing Customer data in the database.
 * Spring will auto-generate necessary methods.
 */
public interface CustomerRepository extends CrudRepository<Customer, Integer> {

}
