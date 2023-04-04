package com.example.demo.dto.auxiliary;

import lombok.Data;

@Data
public class ProductRequestDto {
    private String name;
    private String description;
    private Long categoryId;
}
