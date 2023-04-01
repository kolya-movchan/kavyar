package com.example.demo.service.mapper;

import com.example.demo.dto.PriceRequestDto;
import com.example.demo.dto.PriceResponseDto;
import com.example.demo.model.CoffeeShopProductPK;
import com.example.demo.model.Price;
import com.example.demo.service.CoffeeShopService;
import com.example.demo.service.DtoMapper;
import com.example.demo.service.ProductService;
import org.springframework.stereotype.Service;

@Service
public class PriceMapper implements DtoMapper<Price, PriceRequestDto, PriceResponseDto> {
    private final ProductService productService;
    private final CoffeeShopService coffeeShopService;

    public PriceMapper(ProductService productService, CoffeeShopService coffeeShopService) {
        this.productService = productService;
        this.coffeeShopService = coffeeShopService;
    }

    @Override
    public PriceResponseDto mapToDto(Price price) {
        PriceResponseDto priceResponseDto = new PriceResponseDto();
        priceResponseDto.setCoffeeShopId(price.getCoffeeShopProductPK().getCoffeeShop().getId());
        priceResponseDto.setCoffeeShopTitle(
                price.getCoffeeShopProductPK().getCoffeeShop().getTitle());
        priceResponseDto.setProductId(price.getCoffeeShopProductPK().getProduct().getId());
        priceResponseDto.setProductName(price.getCoffeeShopProductPK().getProduct().getName());
        priceResponseDto.setPrice(price.getPrice());
        return priceResponseDto;
    }

    @Override
    public Price mapToModel(PriceRequestDto priceRequestDto) {
        Price price = new Price();
        CoffeeShopProductPK coffeeShopProductPK = new CoffeeShopProductPK();
        coffeeShopProductPK.setCoffeeShop(
                coffeeShopService.getById(priceRequestDto.getCoffeeShopId()));
        coffeeShopProductPK.setProduct(productService.getById(priceRequestDto.getProductId()));
        price.setCoffeeShopProductPK(coffeeShopProductPK);
        price.setPrice(priceRequestDto.getPrice());
        return price;
    }
}
