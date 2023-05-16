package no.ntnu.group7.coffeeshop.model;

import java.math.BigDecimal;
import java.util.ArrayList;
import java.util.List;

import jakarta.persistence.CascadeType;
import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.OneToMany;
import jakarta.persistence.Table;

/**
 * Represents a product in the coffee shop. This class is responsible for
 * storing the product's name, price, description, image, inventory amount, and
 * its associated category. It is mapped to the "products" table in the
 * database.
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

    @Column
    private int inventoryAmount;

    // @ManyToMany(mappedBy = "products")
    // private Set<Category> categories = new HashSet<>();

    // @OneToMany(mappedBy = "product")
    // private Set<OrderProduct> orderProducts = new HashSet<>();

    // @OneToMany(mappedBy = "product")
    // private Set<ShoppingCartProduct> shoppingCartProducts = new HashSet<>();

    @ManyToOne
    @JoinColumn(name = "category_id")
    private Category category;

    @OneToMany(mappedBy = "product", cascade = CascadeType.ALL, orphanRemoval = true)
    private List<ShoppingCartProduct> shoppingCartProducts = new ArrayList<>();

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

    public int getInventoryAmount() {
        return inventoryAmount;
    }

    public void setInventoryAmount(int inventoryAmount) {
        this.inventoryAmount = inventoryAmount;
    }

    public String getImage() {
        return image;
    }

    public void setImage(String image) {
        this.image = image;
    }
}
