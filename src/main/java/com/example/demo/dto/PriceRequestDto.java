package com.example.demo.dto;

import java.math.BigDecimal;
import lombok.Data;

@Data
public class PriceRequestDto {
    private Long coffeeShopId;
    private Long productId;
    private BigDecimal price;
}
