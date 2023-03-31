package com.example.demo.dto;

import lombok.Data;

import java.math.BigDecimal;

@Data
public class PriceResponseDto {
    private Long coffeeShopId;
    private String coffeeShopTitle;
    private Long productId;
    private String productName;
    private BigDecimal price;
}
