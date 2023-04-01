package com.example.demo.dto;

import java.util.List;
import lombok.Data;

@Data
public class CoffeeShopPriceResponseDto {
    private Long coffeeShopId;
    private String coffeeShopTitle;
    private List<ProductPriceDto> products;
}
