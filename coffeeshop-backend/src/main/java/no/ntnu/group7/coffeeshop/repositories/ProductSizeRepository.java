package no.ntnu.group7.coffeeshop.repositories;

import org.springframework.data.jpa.repository.JpaRepository;

import no.ntnu.group7.coffeeshop.model.ProductSize;

/**
 * Repository interface for accessing ProductSize data in the database.
 * Spring will auto-generate necessary methods.
 */
public interface ProductSizeRepository extends JpaRepository<ProductSize, Integer> {

}
