package com.example.demo.service.impl;

import com.example.demo.model.CoffeeShop;
import com.example.demo.repository.CoffeeShopRepository;
import com.example.demo.service.CoffeeShopService;
import java.util.List;
import org.springframework.stereotype.Service;

@Service
public class CoffeeShopServiceImpl implements CoffeeShopService {
    private final CoffeeShopRepository coffeeShopRepository;

    public CoffeeShopServiceImpl(CoffeeShopRepository coffeeShopRepository) {
        this.coffeeShopRepository = coffeeShopRepository;
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
    public CoffeeShop update(CoffeeShop coffeeShop) {
        return coffeeShopRepository.save(coffeeShop);
    }
}
