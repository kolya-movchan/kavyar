package com.example.demo.service;

import com.example.demo.model.CoffeeShop;
import com.example.demo.model.ProductPrice;
import java.util.List;

public interface CoffeeShopService {
    CoffeeShop create(CoffeeShop coffeeShop);

    List<CoffeeShop> findAll();

    CoffeeShop getById(Long id);

    CoffeeShop delete(Long id);

    CoffeeShop restore(Long id);

    CoffeeShop update(CoffeeShop coffeeShop);

    CoffeeShop getByProductsContains(ProductPrice productPrice);
}
