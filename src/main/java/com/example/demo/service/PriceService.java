package com.example.demo.service;

import com.example.demo.model.Price;
import java.util.List;

public interface PriceService {
    Price create(Price price);

    List<Price> findAllByCoffeeShopId(Long id);

    void delete(Price price);

    Price update(Price price);
}
