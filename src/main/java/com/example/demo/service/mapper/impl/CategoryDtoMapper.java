package com.example.demo.service.mapper.impl;

import com.example.demo.dto.auxiliary.CategoryRequestDto;
import com.example.demo.dto.auxiliary.CategoryResponseDto;
import com.example.demo.model.Category;
import com.example.demo.service.mapper.DtoMapper;
import org.springframework.stereotype.Service;

@Service
public class CategoryDtoMapper implements
        DtoMapper<Category, CategoryRequestDto, CategoryResponseDto> {
    @Override
    public CategoryResponseDto mapToDto(Category category) {
        CategoryResponseDto categoryResponseDto = new CategoryResponseDto();
        categoryResponseDto.setId(category.getId());
        categoryResponseDto.setName(category.getName());
        return categoryResponseDto;
    }

    @Override
    public Category mapToModel(CategoryRequestDto categoryRequestDto) {
        Category category = new Category();
        category.setName(categoryRequestDto.getName());
        return category;
    }
}
