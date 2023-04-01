package com.example.demo.service.mapper;

import com.example.demo.dto.CoffeeShopPriceResponseDto;
import com.example.demo.dto.ProductPriceDto;
import com.example.demo.dto.ProductRequestDto;
import com.example.demo.dto.ProductResponseDto;
import com.example.demo.model.Price;
import com.example.demo.model.Product;
import com.example.demo.service.CoffeeShopService;
import com.example.demo.service.DtoMapper;
import java.util.List;
import java.util.stream.Collectors;
import org.springframework.stereotype.Component;

@Component
public class CoffeeShopPriceMapper {
    private final CoffeeShopService coffeeShopService;
    private final DtoMapper<Product, ProductRequestDto, ProductResponseDto> dtoMapper;

    public CoffeeShopPriceMapper(
            CoffeeShopService coffeeShopService,
            DtoMapper<Product, ProductRequestDto, ProductResponseDto> dtoMapper) {
        this.coffeeShopService = coffeeShopService;
        this.dtoMapper = dtoMapper;
    }

    public CoffeeShopPriceResponseDto mapToDto(Long coffeeShopId, List<Price> prices) {
        CoffeeShopPriceResponseDto coffeeShopPriceResponseDto = new CoffeeShopPriceResponseDto();
        coffeeShopPriceResponseDto.setCoffeeShopId(coffeeShopId);
        coffeeShopPriceResponseDto.setCoffeeShopTitle(
                coffeeShopService.getById(coffeeShopId).getTitle());
        coffeeShopPriceResponseDto.setProducts(prices.stream()
                .map(p -> new ProductPriceDto(dtoMapper.mapToDto(
                        p.getCoffeeShopProductPK().getProduct()), p.getPrice()))
                .collect(Collectors.toList()));
        return coffeeShopPriceResponseDto;
    }
}
