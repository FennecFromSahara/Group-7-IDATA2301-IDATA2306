package no.ntnu.group7.coffeshop.repositories;

import org.springframework.data.jpa.repository.JpaRepository;
import no.ntnu.group7.coffeshop.model.ShoppingCartProduct;

/**
 * Repository interface for accessing ShoppingCartProduct data in the database.
 * Spring will auto-generate necessary methods.
 */
public interface ShoppingCartProductRepository extends JpaRepository<ShoppingCartProduct, Integer> {

}