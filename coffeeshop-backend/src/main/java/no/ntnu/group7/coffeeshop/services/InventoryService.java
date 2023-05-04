package no.ntnu.group7.coffeeshop.services;

import jakarta.persistence.EntityManager;
import jakarta.persistence.PersistenceContext;
import jakarta.transaction.Transactional;
import no.ntnu.group7.coffeeshop.model.Product;

/**
 * InventoryService is a service layer class responsible for managing the
 * inventory of the coffee shop application.
 */
public class InventoryService {

  @PersistenceContext
  private EntityManager entityManager;

  /**
   * Updates the product entity in the database with the provided product object.
   *
   * @param product the Product object containing the updated details to be
   *                persisted in the database
   */
  @Transactional
  public void updateProduct(Product product) {
    entityManager.merge(product);
  }
}
