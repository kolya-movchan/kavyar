package com.example.demo.model;

import jakarta.persistence.EmbeddedId;
import jakarta.persistence.Entity;
import jakarta.persistence.Table;
import java.math.BigDecimal;
import lombok.Data;

@Data
@Entity
@Table(name = "prices")
public class Price {
    @EmbeddedId
    private CoffeeShopProductPK coffeeShopProductPK;
    private BigDecimal price;
}
