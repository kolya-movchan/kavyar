package com.example.demo.model;

import jakarta.persistence.Embeddable;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import java.io.Serializable;
import lombok.Data;

@Data
@Embeddable
public class CoffeeShopDrinkPK implements Serializable {
    @ManyToOne
    @JoinColumn(name = "coffee_shop_id")
    private CoffeeShop coffeeShop;
    @ManyToOne
    @JoinColumn(name = "drink_id")
    private Product product;
}
