package com.example.demo.service;

import com.example.demo.model.Product;
import java.util.List;

public interface ProductService {
    Product create(Product product);

    List<Product> findAll();

    Product getById(Long id);

    void delete(Long id);

    Product update(Product product);
}
