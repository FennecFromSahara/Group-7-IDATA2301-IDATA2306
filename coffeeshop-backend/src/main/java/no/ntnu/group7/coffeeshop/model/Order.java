package no.ntnu.group7.coffeeshop.model;

import java.math.BigDecimal;
import java.time.LocalDateTime;
import java.time.ZoneId;
import java.util.ArrayList;
import java.util.Date;
import java.util.HashSet;
import java.util.List;
import java.util.Set;

import com.fasterxml.jackson.annotation.JsonManagedReference;

import jakarta.persistence.CascadeType;
import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.Enumerated;
import jakarta.persistence.EnumType;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.OneToMany;
import jakarta.persistence.Table;
import jakarta.persistence.Temporal;
import jakarta.persistence.TemporalType;
import jakarta.persistence.JoinColumn;

/**
 * Represents the order of a customer, with a set of orderProducts to keep track
 * of all the products TODO: what happened to the set of orderProducts??
 */
@Entity
@Table(name = "orders")
public class Order {
  @Id
  @GeneratedValue(strategy = GenerationType.IDENTITY)
  private int id;

  @ManyToOne
  @JoinColumn(name = "user_id", nullable = false)
  private User user;

  @Enumerated(EnumType.STRING)
  @Column(name = "order_status", nullable = false)
  private OrderStatus orderStatus;

  @Column(nullable = false)
  private BigDecimal total;

  @Temporal(TemporalType.TIMESTAMP)
  @Column(name = "created_at")
  private Date createdAt;

  // @OneToMany(mappedBy = "order")
  // private Set<OrderProduct> orderProducts = new HashSet<>();

  @OneToMany(mappedBy = "order", cascade = CascadeType.ALL, orphanRemoval = true)
  @JsonManagedReference("order-orderProduct")
  private List<OrderProduct> orderProducts = new ArrayList<>();

  // Enum for order status
  public enum OrderStatus {
    PENDING,
    PROCESSING,
    SHIPPED,
    DELIVERED,
    CANCELED
  }

  /**
   * Empty constructor needed for JPA
   */
  public Order() {
  }

  /**
   * Constructor for creating an order with the current timestamp as the createdAt
   * value.
   * 
   * @param user        The user who placed the order
   * @param orderStatus The status of the order
   * @param total       The total cost of the order
   */
  public Order(User user, OrderStatus orderStatus, BigDecimal total) {
    this.user = user;
    this.orderStatus = orderStatus;
    this.total = total;
    this.createdAt = Date.from(LocalDateTime.now().atZone(ZoneId.systemDefault()).toInstant());
  }

  /**
   * Constructor for creating an order with a specified createdAt timestamp.
   * 
   * @param user        The user who placed the order
   * @param orderStatus The status of the order
   * @param total       The total cost of the order
   * @param createdAt   The timestamp at which the order was created
   */
  public Order(User user, OrderStatus orderStatus, BigDecimal total, Date createdAt) {
    this.user = user;
    this.orderStatus = orderStatus;
    this.total = total;
    this.createdAt = createdAt;
  }

  public int getId() {
    return id;
  }

  public void setId(int id) {
    this.id = id;
  }

  public User getUser() {
    return user;
  }

  public void setUser(User user) {
    this.user = user;
  }

  public OrderStatus getOrderStatus() {
    return orderStatus;
  }

  public void setOrderStatus(OrderStatus orderStatus) {
    this.orderStatus = orderStatus;
  }

  public BigDecimal getTotal() {
    return total;
  }

  public void setTotal(BigDecimal total) {
    this.total = total;
  }

  public Date getCreatedAt() {
    return createdAt;
  }

  public void setCreatedAt(Date createdAt) {
    this.createdAt = createdAt;
  }
}