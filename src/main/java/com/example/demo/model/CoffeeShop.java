package com.example.demo.model;

import jakarta.persistence.*;

import java.time.LocalDateTime;
import java.util.List;
import lombok.Data;

@Data
@Entity
@Table(name = "coffee_shops")
public class CoffeeShop {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    @ManyToOne
    @JoinColumn(name = "city_id")
    private City city;
    private Boolean isDisable;
    @Column(unique = true)
    private String title;
    private String description;
    private String phone;
    private LocalDateTime open;
    private LocalDateTime close;
    private String instagram;
    private String facebook;
    private String url;
    @OneToOne
    private Photo logo;
    @OneToMany
    @JoinTable(name = "coffee_shops_photos",
            joinColumns = @JoinColumn(name = "coffee_shop_id"),
            inverseJoinColumns = @JoinColumn(name = "photo_id"))
    private List<Photo> photos;
    @ManyToMany
    @JoinTable(name = "coffee_shops_features",
            joinColumns = @JoinColumn(name = "coffee_shop_id"),
            inverseJoinColumns = @JoinColumn(name = "feature_id"))
    private List<Feature> features;
    private String location;
}
