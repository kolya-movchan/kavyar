package com.example.demo.service;

import com.example.demo.model.ProductPrice;

public interface ProductPriceService {
    ProductPrice create(ProductPrice productPrice);

    ProductPrice getById(Long id);

    void delete(Long id);

    ProductPrice update(ProductPrice productPrice);
}
