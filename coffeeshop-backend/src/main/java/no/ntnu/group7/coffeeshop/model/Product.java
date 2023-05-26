package no.ntnu.group7.coffeeshop.model;

import java.math.BigDecimal;
import java.util.ArrayList;
import java.util.List;

import com.fasterxml.jackson.annotation.JsonIdentityInfo;
import com.fasterxml.jackson.annotation.JsonManagedReference;
import com.fasterxml.jackson.annotation.ObjectIdGenerators;

import jakarta.persistence.CascadeType;
import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.FetchType;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.JoinTable;
import jakarta.persistence.ManyToMany;
import jakarta.persistence.OneToMany;
import jakarta.persistence.Table;

/**
 * Represents a product in the coffee shop. This class is responsible for
 * storing the product's name, price, description, image, inventory amount, and
 * its associated category. It is mapped to the "products" table in the
 * database.
 */
@JsonIdentityInfo(generator = ObjectIdGenerators.PropertyGenerator.class, property = "id")
@Entity
@Table(name = "products")
public class Product {
  @Id
  @GeneratedValue(strategy = GenerationType.IDENTITY)
  private int id;

  @Column(nullable = false)
  private String name;

  @Column(nullable = false)
  private BigDecimal price;

  @Column(length = 2000)
  private String description;

  @Column
  private String image;

  @Column
  private int inventoryAmount;

  @ManyToMany(fetch = FetchType.EAGER)
  @JoinTable(name = "product_categories", joinColumns = @JoinColumn(name = "product_id"), inverseJoinColumns = @JoinColumn(name = "category_id"))
  @JsonManagedReference("product-category")
  private List<Category> categories = new ArrayList<>();

  // @OneToMany(mappedBy = "product")
  // private Set<OrderProduct> orderProducts = new HashSet<>();

  // @OneToMany(mappedBy = "product")
  // private Set<ShoppingCartProduct> shoppingCartProducts = new HashSet<>();

  @OneToMany(mappedBy = "product", cascade = CascadeType.ALL, orphanRemoval = true)
  @JsonManagedReference("product-cart")
  private List<ShoppingCartProduct> shoppingCartProducts = new ArrayList<>();

  @OneToMany(mappedBy = "product", cascade = CascadeType.ALL, orphanRemoval = true)
  @JsonManagedReference("product-size")
  private List<ProductSize> productSizes = new ArrayList<>();

  @OneToMany(mappedBy = "product", cascade = CascadeType.ALL, orphanRemoval = true)
  @JsonManagedReference("product-review")
  private List<Review> reviews = new ArrayList<>();

  /**
   * Empty constructor needed for JPA
   */
  public Product() {
  }

  /**
   * Constructs a new Product with the specified name, price, description, image,
   * and inventory amount.
   *
   * @param name            Name of the product.
   * @param price           Price of the product.
   * @param description     Product description.
   * @param image           String representing the location of the product image.
   * @param inventoryAmount Amount of the product in inventory.
   */
  public Product(String name, BigDecimal price, String description, String image, int inventoryAmount) {
    this.name = name;
    this.price = price;
    this.description = description;
    this.image = image;
    this.inventoryAmount = inventoryAmount;
  }

  /**
   * @return the id
   */
  public int getId() {
    return id;
  }

  /**
   * @param id the id to set
   */
  public void setId(int id) {
    this.id = id;
  }

  /**
   * @return the name
   */
  public String getName() {
    return name;
  }

  /**
   * @param name the name to set
   */
  public void setName(String name) {
    this.name = name;
  }

  /**
   * @return the price
   */
  public BigDecimal getPrice() {
    return price;
  }

  /**
   * @param price the price to set
   */
  public void setPrice(BigDecimal price) {
    this.price = price;
  }

  /**
   * @return the description
   */
  public String getDescription() {
    return description;
  }

  /**
   * @param description the description to set
   */
  public void setDescription(String description) {
    this.description = description;
  }

  /**
   * @return the image
   */
  public String getImage() {
    return image;
  }

  /**
   * @param image the image to set
   */
  public void setImage(String image) {
    this.image = image;
  }

  /**
   * @return the inventoryAmount
   */
  public int getInventoryAmount() {
    return inventoryAmount;
  }

  /**
   * @param inventoryAmount the inventoryAmount to set
   */
  public void setInventoryAmount(int inventoryAmount) {
    this.inventoryAmount = inventoryAmount;
  }

  /**
   * @return the categories
   */
  public List<Category> getCategories() {
    return categories;
  }

  /**
   * @param categories the categories to set
   */
  public void setCategories(List<Category> categories) {
    this.categories = categories;
  }

  /**
   * @return the shoppingCartProducts
   */
  public List<ShoppingCartProduct> getShoppingCartProducts() {
    return shoppingCartProducts;
  }

  /**
   * @param shoppingCartProducts the shoppingCartProducts to set
   */
  public void setShoppingCartProducts(List<ShoppingCartProduct> shoppingCartProducts) {
    this.shoppingCartProducts = shoppingCartProducts;
  }

  /**
   * @return the product sizes
   */
  public List<ProductSize> getProductSizes() {
    return productSizes;
  }

  /**
   * @param reviews the product sizes to set
   */
  public void addProductSizes(List<ProductSize> productSizes) {
    this.productSizes = productSizes;
  }

  /**
   * @return the reviews
   */
  public List<Review> getReviews() {
    return reviews;
  }

  /**
   * @param reviews the reviews to set
   */
  public void setReviews(List<Review> reviews) {
    this.reviews = reviews;
  }

}
