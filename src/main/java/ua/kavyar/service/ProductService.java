package ua.kavyar.service;

import ua.kavyar.model.Product;
import java.util.List;

public interface ProductService {
    Product create(Product product);

    List<Product> findAll();

    Product getById(Long id);

    void delete(Long id);

    Product update(Product product);
}
