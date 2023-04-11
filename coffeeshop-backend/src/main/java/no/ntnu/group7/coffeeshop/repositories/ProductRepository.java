package no.ntnu.group7.coffeeshop.repositories;

import org.springframework.data.jpa.repository.JpaRepository;
import no.ntnu.group7.coffeeshop.model.Product;

/**
 * Repository interface for accessing Product data in the database.
 * Spring will auto-generate necessary methods.
 */
public interface ProductRepository extends JpaRepository<Product, Integer> {

}
