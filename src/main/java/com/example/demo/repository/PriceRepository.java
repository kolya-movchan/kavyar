package com.example.demo.repository;

import com.example.demo.model.CoffeeShop;
import com.example.demo.model.Price;
import java.util.List;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface PriceRepository extends JpaRepository<Price, Long> {
    List<Price> findAllByCoffeeShopProductPK_CoffeeShop(CoffeeShop coffeeShop);
}
