package com.example.demo.repository;

import com.example.demo.model.CoffeeShop;
import com.example.demo.model.ProductPrice;
import org.springframework.data.jpa.repository.JpaRepository;

public interface CoffeeShopRepository extends JpaRepository<CoffeeShop, Long> {
    CoffeeShop getByProductsContains(ProductPrice productPrice);
}
