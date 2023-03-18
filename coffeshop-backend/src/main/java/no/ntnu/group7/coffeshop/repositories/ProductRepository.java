package no.ntnu.group7.coffeshop.repositories;

import org.springframework.data.repository.CrudRepository;
import no.ntnu.group7.coffeshop.model.Product;

/**
 * Repository interface for accessing Product data in the database.
 * Spring will auto-generate necessary methods.
 */
public interface ProductRepository extends CrudRepository<Product, Integer> {
    
}
