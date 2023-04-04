package com.example.demo.service.mapper.impl;

import com.example.demo.dto.ProductPriceRequestDto;
import com.example.demo.dto.ProductPriceResponseDto;
import com.example.demo.dto.ProductRequestDto;
import com.example.demo.dto.ProductResponseDto;
import com.example.demo.model.Product;
import com.example.demo.model.ProductPrice;
import com.example.demo.service.ProductService;
import com.example.demo.service.mapper.DtoMapper;
import org.springframework.stereotype.Service;

@Service
public class ProductPriceDtoMapper implements
        DtoMapper<ProductPrice, ProductPriceRequestDto, ProductPriceResponseDto> {
    private final ProductService productService;
    private final DtoMapper<Product, ProductRequestDto, ProductResponseDto> productDtoMapper;

    public ProductPriceDtoMapper(
            ProductService productService,
            DtoMapper<Product, ProductRequestDto, ProductResponseDto> productDtoMapper) {
        this.productDtoMapper = productDtoMapper;
        this.productService = productService;
    }

    @Override
    public ProductPriceResponseDto mapToDto(ProductPrice productPrice) {
        ProductPriceResponseDto productPriceResponseDto = new ProductPriceResponseDto();
        productPriceResponseDto.setId(productPrice.getId());
        productPriceResponseDto.setProduct(productDtoMapper.mapToDto(productPrice.getProduct()));
        productPriceResponseDto.setPrice(productPrice.getPrice());
        return productPriceResponseDto;
    }

    @Override
    public ProductPrice mapToModel(ProductPriceRequestDto productPriceRequestDto) {
        ProductPrice productPrice = new ProductPrice();
        productPrice.setProduct(productService.getById(productPriceRequestDto.getProductId()));
        productPrice.setPrice(productPriceRequestDto.getPrice());
        return productPrice;
    }
}
