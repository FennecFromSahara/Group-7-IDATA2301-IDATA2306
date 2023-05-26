package no.ntnu.group7.coffeeshop.services;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import jakarta.transaction.Transactional;
import no.ntnu.group7.coffeeshop.model.Product;
import no.ntnu.group7.coffeeshop.repositories.ProductRepository;

@Service
public class ProductService {
  private final ProductRepository productRepository;

  @Autowired
  public ProductService(ProductRepository productRepository) {
    this.productRepository = productRepository;
  }

  @Transactional
  public void saveProductWithSizes(Product product) {
    product.getProductSizes().forEach(productSize -> productSize.setProduct(product));
    productRepository.save(product);
  }
}
