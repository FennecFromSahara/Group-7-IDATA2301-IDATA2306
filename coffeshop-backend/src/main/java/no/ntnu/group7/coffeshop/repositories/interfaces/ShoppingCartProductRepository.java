package no.ntnu.group7.coffeshop.repositories.interfaces;

import org.springframework.data.repository.CrudRepository;
import no.ntnu.group7.coffeshop.model.ShoppingCartProduct;

/**
 * Repository interface for accessing ShoppingCartProduct data in the database.
 * Spring will auto-generate necessary methods.
 */
public interface ShoppingCartProductRepository extends CrudRepository<ShoppingCartProduct, Integer> {

}
