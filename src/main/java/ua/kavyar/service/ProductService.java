package ua.kavyar.service;

import java.util.List;
import java.util.Map;
import ua.kavyar.model.Product;

public interface ProductService {
    Product create(Product product);

    List<Product> findAll(Map<String, String> params);

    Product getById(Long id);

    void delete(Long id);

    Product update(Product product);
}
