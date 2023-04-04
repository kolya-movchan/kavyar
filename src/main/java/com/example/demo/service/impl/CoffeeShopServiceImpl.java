package com.example.demo.service.impl;

import com.example.demo.model.CoffeeShop;
import com.example.demo.model.ProductPrice;
import com.example.demo.repository.CoffeeShopRepository;
import com.example.demo.service.CoffeeShopService;
import com.example.demo.service.ProductPriceService;
import java.util.ArrayList;
import java.util.List;
import org.springframework.stereotype.Service;

@Service
public class CoffeeShopServiceImpl implements CoffeeShopService {
    private final CoffeeShopRepository coffeeShopRepository;
    private final ProductPriceService productPriceService;

    public CoffeeShopServiceImpl(CoffeeShopRepository coffeeShopRepository,
                                 ProductPriceService productPriceService) {
        this.coffeeShopRepository = coffeeShopRepository;
        this.productPriceService = productPriceService;
    }

    @Override
    public CoffeeShop create(CoffeeShop coffeeShop) {
        return coffeeShopRepository.save(coffeeShop);
    }

    @Override
    public List<CoffeeShop> findAll() {
        return coffeeShopRepository.findAll();
    }

    @Override
    public CoffeeShop getById(Long id) {
        return coffeeShopRepository.getReferenceById(id);
    }

    @Override
    public CoffeeShop delete(Long id) {
        CoffeeShop coffeeShop = coffeeShopRepository.getReferenceById(id);
        coffeeShop.setIsDisable(true);
        return coffeeShopRepository.save(coffeeShop);
    }

    @Override
    public CoffeeShop restore(Long id) {
        CoffeeShop coffeeShop = coffeeShopRepository.getReferenceById(id);
        coffeeShop.setIsDisable(false);
        return coffeeShopRepository.save(coffeeShop);
    }

    @Override
    public CoffeeShop update(CoffeeShop coffeeShop) {
        List<ProductPrice> productsFromDb = new ArrayList<>(
                coffeeShopRepository.getReferenceById(coffeeShop.getId()).getProducts());
        productsFromDb.removeAll(coffeeShop.getProducts());
        CoffeeShop updatedCoffeeShop = coffeeShopRepository.save(coffeeShop);
        productsFromDb.forEach(p -> productPriceService.delete(p.getId()));
        return updatedCoffeeShop;
    }

    @Override
    public CoffeeShop getByProductsContains(ProductPrice productPrice) {
        return coffeeShopRepository.getByProductsContains(productPrice);
    }
}
