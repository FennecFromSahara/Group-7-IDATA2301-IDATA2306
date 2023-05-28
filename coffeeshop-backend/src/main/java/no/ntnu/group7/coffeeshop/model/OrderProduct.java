package no.ntnu.group7.coffeeshop.model;

import com.fasterxml.jackson.annotation.JsonBackReference;
import com.fasterxml.jackson.annotation.JsonIdentityInfo;
import com.fasterxml.jackson.annotation.ObjectIdGenerators;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.Table;

/**
 * Represents an order of a product. This class is responsible for storing
 * the relationship between an order and a product, including the price and
 * quantity of the product in the order. It is mapped to the "order_product"
 * table in the database.
 */
@JsonIdentityInfo(generator = ObjectIdGenerators.PropertyGenerator.class, property = "id")
@Entity
@Table(name = "order_product")
public class OrderProduct {
  @Id
  @GeneratedValue(strategy = GenerationType.IDENTITY)
  private long id;

  @ManyToOne
  @JsonBackReference("order-orderProduct")
  @JoinColumn(name = "order_id", nullable = false)
  private Order order;

  @ManyToOne
  @JoinColumn(name = "product_id", nullable = false)
  private Product product;

  @Column(nullable = false)
  private int quantity;

  /**
   * Empty constructor needed for JPA
   */
  public OrderProduct() {
  }

  /**
   * Constructs a new OrderProduct with the specified order, product, price, and
   * quantity.
   *
   * @param order    The order associated with this order product.
   * @param product  The product associated with this order product.
   * @param quantity The quantity of the product in the order.
   */
  public OrderProduct(Order order, Product product, int quantity) {
    this.order = order;
    this.product = product;
    this.quantity = quantity;
  }

  /**
   * @return the id
   */
  public long getId() {
    return id;
  }

  /**
   * @param id the id to set
   */
  public void setId(long id) {
    this.id = id;
  }

  /**
   * @return the order
   */
  public Order getOrder() {
    return order;
  }

  /**
   * @param order the order to set
   */
  public void setOrder(Order order) {
    this.order = order;
  }

  /**
   * @return the product
   */
  public Product getProduct() {
    return product;
  }

  /**
   * @param product the product to set
   */
  public void setProduct(Product product) {
    this.product = product;
  }

  /**
   * @return the quantity
   */
  public int getQuantity() {
    return quantity;
  }

  /**
   * @param quantity the quantity to set
   */
  public void setQuantity(int quantity) {
    this.quantity = quantity;
  }

}
