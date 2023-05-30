package no.ntnu.group7.coffeeshop.model;

import java.math.BigDecimal;
import java.util.ArrayList;
import java.util.List;

import com.fasterxml.jackson.annotation.JsonIdentityInfo;
import com.fasterxml.jackson.annotation.JsonManagedReference;
import com.fasterxml.jackson.annotation.ObjectIdGenerators;

import io.swagger.v3.oas.annotations.media.Schema;
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
@Schema(description = "Represents a product in the coffeeshop")
public class Product {
  @Id
  @GeneratedValue(strategy = GenerationType.IDENTITY)
  @Schema(description = "Unique ID")
  private int id;

  @Column(nullable = false)
  @Schema(description = "Name of the product")
  private String name;

  @Column(nullable = false)
  @Schema(description = "Product price")
  private BigDecimal price;

  @Column(length = 2000)
  @Schema(description = "Product description")
  private String description;

  @Column
  @Schema(description = "Product image")
  private String image;

  @Column
  @Schema(description = "How much of this product is in stock")
  private int inventoryAmount;

  @ManyToMany(fetch = FetchType.EAGER)
  @JoinTable(name = "product_categories", joinColumns = @JoinColumn(name = "product_id"), inverseJoinColumns = @JoinColumn(name = "category_id"))
  @JsonManagedReference("product-category")
  @Schema(description = "List of categories this product belongs in")
  private List<Category> categories = new ArrayList<>();

  @OneToMany(mappedBy = "product", cascade = CascadeType.ALL, orphanRemoval = true)
  @JsonManagedReference("product-cart")
  @Schema(description = "List of shoppingCartProducts who represent this product")
  private List<ShoppingCartProduct> shoppingCartProducts = new ArrayList<>();

  @OneToMany(mappedBy = "product", cascade = CascadeType.ALL, orphanRemoval = true)
  @JsonManagedReference("product-review")
  @Schema(description = "List of reviews this product has")
  private List<Review> reviews = new ArrayList<>();

  @OneToMany(mappedBy = "product", cascade = CascadeType.ALL, orphanRemoval = true)
  @JsonManagedReference("product-orderProduct")
  @Schema(description = "List of OrderProducts who represent this product")
  private List<OrderProduct> orderProducts = new ArrayList<>();

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

  /**
   * @return the orderProducts
   */
  public List<OrderProduct> getOrderProducts() {
    return orderProducts;
  }

  /**
   * @param orderProducts the orderProducts to set
   */
  public void setOrderProducts(List<OrderProduct> orderProducts) {
    this.orderProducts = orderProducts;
  }

  /**
   * @param shoppingCartProduct the ShoppingCartProduct to remove
   */
  public void removeShoppingCartProduct(ShoppingCartProduct shoppingCartProduct) {
    shoppingCartProducts.remove(shoppingCartProduct);
    shoppingCartProduct.setProduct(null);
  }

  /**
   * @param orderProduct the OrderProduct to remove
   */
  public void removeOrderProduct(OrderProduct orderProduct) {
    orderProducts.remove(orderProduct);
    orderProduct.setProduct(null);
  }
}
