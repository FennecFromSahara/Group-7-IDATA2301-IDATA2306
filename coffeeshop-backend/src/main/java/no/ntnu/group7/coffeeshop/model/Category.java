package no.ntnu.group7.coffeeshop.model;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.Table;

/**
 * Represents a category a product can have
 */
@Entity
@Table(name = "categories")
public class Category {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int id;

    @Column(nullable = false)
    private String name;

    // @ManyToMany
    // @JoinTable(name = "product_category", joinColumns = @JoinColumn(name =
    // "category_id"), inverseJoinColumns = @JoinColumn(name = "product_id"))
    // @JsonIgnore
    // private Set<Product> products = new HashSet<>();

    /**
     * Empty constructor needed for JPA
     */
    public Category() {
    }

    /**
     * Constructor with name as parameter
     * 
     * @param name name of category
     */
    public Category(String name) {
        this.name = name;
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
}
