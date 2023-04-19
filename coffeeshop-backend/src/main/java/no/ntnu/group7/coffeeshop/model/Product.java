package no.ntnu.group7.coffeeshop.model;

import java.math.BigDecimal;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.Table;

/**
 * Represents a product
 */
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

    @Column
    private String description;

    @Column
    private String image;

    // @ManyToMany(mappedBy = "products")
    // private Set<Category> categories = new HashSet<>();

    // @OneToMany(mappedBy = "product")
    // private Set<OrderProduct> orderProducts = new HashSet<>();

    // @OneToMany(mappedBy = "product")
    // private Set<ShoppingCartProduct> shoppingCartProducts = new HashSet<>();

    @ManyToOne
    @JoinColumn(name = "category_id")
    private Category category;

    /**
     * Empty constructor needed for JPA
     */
    public Product() {
    }

    /**
     * Create a product
     * 
     * @param name        Name of the product
     * @param price       Price of the product
     * @param description Product description
     */
    public Product(String name, BigDecimal price, String description) {
        this.name = name;
        this.price = price;
        this.description = description;
    }

    public int getId() {
        return id;
    }

    public void setId(int id) {
        this.id = id;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public BigDecimal getPrice() {
        return price;
    }

    public void setPrice(BigDecimal price) {
        this.price = price;
    }

    public String getDescription() {
        return description;
    }

    public void setDescription(String description) {
        this.description = description;
    }
}
