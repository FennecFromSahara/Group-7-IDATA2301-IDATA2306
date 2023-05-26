package no.ntnu.group7.coffeeshop.repositories;

import org.springframework.data.jpa.repository.JpaRepository;

import no.ntnu.group7.coffeeshop.model.Review;

/**
 * Repository interface for accessing reviews in the database.
 * Spring will auto-generate necessary methods.
 */
public interface ReviewRepository extends JpaRepository<Review, Integer> {

}