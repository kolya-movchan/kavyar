package com.example.demo.service.impl;

import com.example.demo.model.ProductPrice;
import com.example.demo.repository.ProductPriceRepository;
import com.example.demo.service.ProductPriceService;
import org.springframework.stereotype.Service;

@Service
public class ProductPriceServiceImpl implements ProductPriceService {
    private final ProductPriceRepository productPriceRepository;

    public ProductPriceServiceImpl(ProductPriceRepository productPriceRepository) {
        this.productPriceRepository = productPriceRepository;
    }

    @Override
    public ProductPrice create(ProductPrice productPrice) {
        return productPriceRepository.save(productPrice);
    }

    @Override
    public ProductPrice getById(Long id) {
        return productPriceRepository.getReferenceById(id);
    }

    @Override
    public void delete(Long id) {
        productPriceRepository.deleteById(id);
    }

    @Override
    public ProductPrice update(ProductPrice productPrice) {
        return productPriceRepository.save(productPrice);
    }
}
