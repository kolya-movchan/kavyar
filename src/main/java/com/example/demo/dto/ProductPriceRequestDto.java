package com.example.demo.dto;

import java.math.BigDecimal;
import lombok.Data;

@Data
public class ProductPriceRequestDto {
    private Long productId;
    private BigDecimal price;
}
