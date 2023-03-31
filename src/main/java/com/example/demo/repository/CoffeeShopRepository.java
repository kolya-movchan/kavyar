package com.example.demo.repository;

import com.example.demo.model.CoffeeShop;
import org.springframework.data.jpa.repository.JpaRepository;

public interface CoffeeShopRepository extends JpaRepository<CoffeeShop, Long> {
}
