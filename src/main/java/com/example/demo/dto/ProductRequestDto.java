package com.example.demo.dto;

import lombok.Data;

@Data
public class ProductRequestDto {
    private String name;
    private String description;
    private Long categoryId;
}
