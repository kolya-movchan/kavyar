package com.example.demo.dto;

import java.math.BigDecimal;
import lombok.Data;

@Data
public class ProductPriceDto {
    private ProductResponseDto product;
    private BigDecimal price;

    public ProductPriceDto(ProductResponseDto product, BigDecimal price) {
        this.product = product;
        this.price = price;
    }
}
