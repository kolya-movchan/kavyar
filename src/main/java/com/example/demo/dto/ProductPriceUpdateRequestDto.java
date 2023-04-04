package com.example.demo.dto;

import java.math.BigDecimal;
import lombok.Data;

@Data
public class ProductPriceUpdateRequestDto {
    private Long productPriceId;
    private BigDecimal price;
}
