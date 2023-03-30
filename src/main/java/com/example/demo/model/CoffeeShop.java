package com.example.demo.model;

import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.JoinTable;
import jakarta.persistence.ManyToMany;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.OneToMany;
import jakarta.persistence.OneToOne;
import jakarta.persistence.Table;
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
    @JoinTable(name = "photos",
            joinColumns = @JoinColumn(name = "coffee_shop_id"),
            inverseJoinColumns = @JoinColumn(name = "photo_id"))
    private List<Photo> photos;
    @ManyToMany
    @JoinTable(name = "features",
            joinColumns = @JoinColumn(name = "coffee_shop_id"),
            inverseJoinColumns = @JoinColumn(name = "feature_id"))
    private List<Feature> features;

    private String location;
}
