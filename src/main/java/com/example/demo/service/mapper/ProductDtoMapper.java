package com.example.demo.service.mapper;

import com.example.demo.dto.ProductRequestDto;
import com.example.demo.dto.ProductResponseDto;
import com.example.demo.model.Product;
import com.example.demo.service.CategoryService;
import com.example.demo.service.DtoMapper;
import org.springframework.stereotype.Service;

@Service
public class ProductDtoMapper implements
        DtoMapper<Product, ProductRequestDto, ProductResponseDto> {
    private final CategoryService categoryService;

    public ProductDtoMapper(CategoryService categoryService) {
        this.categoryService = categoryService;
    }

    @Override
    public ProductResponseDto mapToDto(Product product) {
        ProductResponseDto productResponseDto = new ProductResponseDto();
        productResponseDto.setId(product.getId());
        productResponseDto.setName(product.getName());
        productResponseDto.setDescription(product.getDescription());
        productResponseDto.setCategoryId(product.getCategory().getId());
        productResponseDto.setCategoryName(
                categoryService.getById(product.getCategory().getId()).getName());
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
