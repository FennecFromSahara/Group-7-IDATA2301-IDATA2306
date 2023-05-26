package no.ntnu.group7.coffeeshop.services;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import jakarta.transaction.Transactional;
import no.ntnu.group7.coffeeshop.model.Product;
import no.ntnu.group7.coffeeshop.model.Review;
import no.ntnu.group7.coffeeshop.model.User;
import no.ntnu.group7.coffeeshop.repositories.ProductRepository;
import no.ntnu.group7.coffeeshop.repositories.ReviewRepository;

@Service
public class ProductService {
  private final ProductRepository productRepository;
  private final ReviewRepository reviewRepository;

  @Autowired
  public ProductService(ProductRepository productRepository, ReviewRepository reviewRepository) {
    this.productRepository = productRepository;
    this.reviewRepository = reviewRepository;
  }

  @Transactional
  public void saveProductWithSizes(Product product) {
    product.getProductSizes().forEach(productSize -> productSize.setProduct(product));
    productRepository.save(product);
  }

  @Transactional
  public void saveProductWithReviews(Product product, List<Review> reviews, User user) {
    reviews.forEach(review -> {
      review.setProduct(product);
      review.setUser(user);
      reviewRepository.save(review);
    });
    product.setReviews(reviews);
    productRepository.save(product);
  }
}
