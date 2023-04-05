package ua.kavyar.service;

import ua.kavyar.model.CoffeeShop;
import ua.kavyar.model.ProductPrice;
import java.util.Map;
import org.springframework.data.domain.Page;

public interface CoffeeShopService {
    CoffeeShop create(CoffeeShop coffeeShop);

    Page<CoffeeShop> findAll(Map<String, String> params);

    CoffeeShop getById(Long id);

    CoffeeShop delete(Long id);

    CoffeeShop restore(Long id);

    CoffeeShop update(CoffeeShop coffeeShop);

    CoffeeShop getByProductsContains(ProductPrice productPrice);
}
