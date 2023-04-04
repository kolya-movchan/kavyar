package com.example.demo.service.mapper.impl;

import com.example.demo.dto.auxiliary.CategoryRequestDto;
import com.example.demo.dto.auxiliary.CategoryResponseDto;
import com.example.demo.dto.auxiliary.ProductRequestDto;
import com.example.demo.dto.auxiliary.ProductResponseDto;
import com.example.demo.model.Category;
import com.example.demo.model.Product;
import com.example.demo.service.CategoryService;
import com.example.demo.service.mapper.DtoMapper;
import org.springframework.stereotype.Service;

@Service
public class ProductDtoMapper implements
        DtoMapper<Product, ProductRequestDto, ProductResponseDto> {
    private final DtoMapper<Category, CategoryRequestDto, CategoryResponseDto> categoryDtoMapper;
    private final CategoryService categoryService;

    public ProductDtoMapper(
            DtoMapper<Category, CategoryRequestDto, CategoryResponseDto> categoryDtoMapper,
            CategoryService categoryService) {
        this.categoryDtoMapper = categoryDtoMapper;
        this.categoryService = categoryService;
    }

    @Override
    public ProductResponseDto mapToDto(Product product) {
        ProductResponseDto productResponseDto = new ProductResponseDto();
        productResponseDto.setId(product.getId());
        productResponseDto.setName(product.getName());
        productResponseDto.setDescription(product.getDescription());
        productResponseDto.setCategory(categoryDtoMapper.mapToDto(product.getCategory()));
        return productResponseDto;
    }

    @Override
    public Product mapToModel(ProductRequestDto productRequestDto) {
        Product product = new Product();
        product.setName(productRequestDto.getName());
        product.setDescription(productRequestDto.getDescription());
        product.setCategory(categoryService.getById(productRequestDto.getCategoryId()));
        return product;
    }
}
