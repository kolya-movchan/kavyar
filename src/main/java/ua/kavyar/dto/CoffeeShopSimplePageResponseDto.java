package ua.kavyar.dto;

import java.util.List;
import lombok.Data;

@Data
public class CoffeeShopSimplePageResponseDto {
    private Boolean hasNextPage;
    private List<CoffeeShopSimpleResponseDto> coffeeShops;
}
