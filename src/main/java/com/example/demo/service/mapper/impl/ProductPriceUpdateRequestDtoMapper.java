package com.example.demo.service.mapper.impl;

import com.example.demo.dto.ProductPriceUpdateRequestDto;
import com.example.demo.model.ProductPrice;
import com.example.demo.service.ProductPriceService;
import com.example.demo.service.mapper.RequestDtoMapper;
import org.springframework.stereotype.Service;

@Service
public class ProductPriceUpdateRequestDtoMapper implements
        RequestDtoMapper<ProductPrice, ProductPriceUpdateRequestDto> {
    private final ProductPriceService productPriceService;

    public ProductPriceUpdateRequestDtoMapper(ProductPriceService productPriceService) {
        this.productPriceService = productPriceService;
    }

    @Override
    public ProductPrice mapToModel(ProductPriceUpdateRequestDto productPriceUpdateRequestDto) {
        ProductPrice productPrice = new ProductPrice();
        productPrice.setId(productPriceUpdateRequestDto.getProductPriceId());
        productPrice.setProduct(productPriceService.getById(
                productPriceUpdateRequestDto.getProductPriceId()).getProduct());
        productPrice.setPrice(productPriceUpdateRequestDto.getPrice());
        return productPrice;
    }
}
