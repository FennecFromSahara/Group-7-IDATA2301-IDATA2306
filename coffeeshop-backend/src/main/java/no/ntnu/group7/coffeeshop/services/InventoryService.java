package no.ntnu.group7.coffeeshop.services;

import jakarta.persistence.EntityManager;
import jakarta.persistence.PersistenceContext;
import jakarta.transaction.Transactional;
import no.ntnu.group7.coffeeshop.model.Product;

/**
 * Provides service for managing the inventory of the coffeeshop.
 */
public class InventoryService {

  @PersistenceContext
  private EntityManager entityManager;

  /**
   * Updated the product entity in the database
   * 
   * @param shoppingCartProduct product to update
   */
  @Transactional
  public void updateProduct(Product product) {
    entityManager.merge(product);
  }
}
