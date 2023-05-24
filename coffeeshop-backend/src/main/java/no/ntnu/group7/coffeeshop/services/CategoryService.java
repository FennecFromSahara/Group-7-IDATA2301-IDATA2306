package no.ntnu.group7.coffeeshop.services;

import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import no.ntnu.group7.coffeeshop.model.Category;
import no.ntnu.group7.coffeeshop.model.Product;
import no.ntnu.group7.coffeeshop.repositories.CategoryRepository;
import no.ntnu.group7.coffeeshop.repositories.ProductRepository;

@Service
public class CategoryService {

  @Autowired
  private CategoryRepository categoryRepository;

  @Autowired
  private ProductRepository productRepository;

  @Transactional
  public boolean deleteCategory(int categoryId) {
    Optional<Category> categoryOpt = categoryRepository.findById(categoryId);

    if (categoryOpt.isPresent()) {
      Category category = categoryOpt.get();

      for (Product product : category.getProducts()) {
        product.getCategories().remove(category);
        productRepository.save(product);
      }
      categoryRepository.delete(category);

      return true;
    } else {
      return false;
    }
  }
}
