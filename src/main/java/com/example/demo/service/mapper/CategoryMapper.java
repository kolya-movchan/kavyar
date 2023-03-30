package com.example.demo.service.mapper;

import com.example.demo.dto.CategoryRequestDto;
import com.example.demo.dto.CategoryResponseDto;
import com.example.demo.model.Category;
import org.springframework.stereotype.Service;

@Service
public class CategoryMapper implements
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
