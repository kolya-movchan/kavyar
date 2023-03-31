package com.example.demo.dto;

import lombok.Data;

@Data
public class ProductResponseDto {
    private Long id;
    private String name;
    private String description;
    private CategoryResponseDto category;
}
