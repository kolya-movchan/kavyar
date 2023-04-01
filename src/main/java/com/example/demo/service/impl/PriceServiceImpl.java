package com.example.demo.service.impl;

import com.example.demo.model.CoffeeShop;
import com.example.demo.model.Price;
import com.example.demo.repository.PriceRepository;
import com.example.demo.service.CoffeeShopService;
import com.example.demo.service.PriceService;
import java.util.List;
import org.springframework.stereotype.Service;

@Service
public class PriceServiceImpl implements PriceService {
    private final PriceRepository priceRepository;
    private final CoffeeShopService coffeeShopService;

    public PriceServiceImpl(PriceRepository priceRepository,
                            CoffeeShopService coffeeShopService) {
        this.priceRepository = priceRepository;
        this.coffeeShopService = coffeeShopService;
    }

    @Override
    public Price create(Price price) {
        return priceRepository.save(price);
    }

    @Override
    public List<Price> findAllByCoffeeShopId(Long id) {
        CoffeeShop coffeeShop = coffeeShopService.getById(id);
        return priceRepository.findAllByCoffeeShopProductPK_CoffeeShop(coffeeShop);
    }

    @Override
    public void delete(Price price) {
        priceRepository.delete(price);
    }

    @Override
    public Price update(Price price) {
        return priceRepository.save(price);
    }
}
