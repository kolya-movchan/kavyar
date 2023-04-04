package com.example.demo.service.mapper.impl;

import com.example.demo.dto.CoffeeShopUpdateRequestDto;
import com.example.demo.dto.ProductPriceRequestDto;
import com.example.demo.dto.ProductPriceResponseDto;
import com.example.demo.dto.ProductPriceUpdateRequestDto;
import com.example.demo.model.CoffeeShop;
import com.example.demo.model.ProductPrice;
import com.example.demo.service.CityService;
import com.example.demo.service.CoffeeShopService;
import com.example.demo.service.FeatureService;
import com.example.demo.service.PhotoService;
import com.example.demo.service.mapper.DtoMapper;
import com.example.demo.service.mapper.RequestDtoMapper;
import java.util.List;
import java.util.stream.Collectors;
import org.springframework.stereotype.Service;

@Service
public class CoffeeShopUpdateRequestDtoMapper implements
        RequestDtoMapper<CoffeeShop, CoffeeShopUpdateRequestDto> {
    private final RequestDtoMapper<ProductPrice,
            ProductPriceUpdateRequestDto> productPriceUpdateRequestDtoMapper;
    private final DtoMapper<ProductPrice, ProductPriceRequestDto,
            ProductPriceResponseDto> productPriceDtoMapper;
    private final CityService cityService;
    private final PhotoService photoService;
    private final FeatureService featureService;
    private final CoffeeShopService coffeeShopService;

    public CoffeeShopUpdateRequestDtoMapper(
            RequestDtoMapper<ProductPrice,
                    ProductPriceUpdateRequestDto> productPriceUpdateRequestDtoMapper,
            DtoMapper<ProductPrice,
                    ProductPriceRequestDto, ProductPriceResponseDto> productPriceDtoMapper,
            CityService cityService,
            PhotoService photoService,
            FeatureService featureService,
            CoffeeShopService coffeeShopService) {
        this.productPriceUpdateRequestDtoMapper = productPriceUpdateRequestDtoMapper;
        this.productPriceDtoMapper = productPriceDtoMapper;
        this.cityService = cityService;
        this.photoService = photoService;
        this.featureService = featureService;
        this.coffeeShopService = coffeeShopService;
    }

    @Override
    public CoffeeShop mapToModel(CoffeeShopUpdateRequestDto coffeeShopUpdateRequestDto) {
        CoffeeShop coffeeShop = new CoffeeShop();
        coffeeShop.setId(coffeeShopUpdateRequestDto.getCoffeeShopId());
        coffeeShop.setCity(cityService.getById(coffeeShopUpdateRequestDto.getCityId()));
        coffeeShop.setIsDisable(coffeeShopService.getById(
                coffeeShopUpdateRequestDto.getCoffeeShopId()).getIsDisable());
        coffeeShop.setTitle(coffeeShopUpdateRequestDto.getTitle());
        coffeeShop.setDescription(coffeeShopUpdateRequestDto.getDescription());
        coffeeShop.setPhone(coffeeShopUpdateRequestDto.getPhone());
        coffeeShop.setOpen(coffeeShopUpdateRequestDto.getOpen());
        coffeeShop.setClose(coffeeShopUpdateRequestDto.getClose());
        coffeeShop.setUrl(coffeeShopUpdateRequestDto.getUrl());
        coffeeShop.setLogo(photoService.getById(coffeeShopUpdateRequestDto.getLogoId()));
        coffeeShop.setLocation(coffeeShopUpdateRequestDto.getLocation());
        coffeeShop.setPhotos(coffeeShopUpdateRequestDto.getPhotos().stream()
                .map(photoService::getById).collect(Collectors.toList()));
        coffeeShop.setFeatures(coffeeShopUpdateRequestDto.getFeatures().stream()
                .map(featureService::getById).collect(Collectors.toList()));
        coffeeShop.setProducts(getProductPrices(coffeeShopUpdateRequestDto));
        return coffeeShop;
    }

    private List<ProductPrice> getProductPrices(
            CoffeeShopUpdateRequestDto coffeeShopUpdateRequestDto) {
        List<ProductPrice> productPrices =
                coffeeShopUpdateRequestDto.getProductPrices().stream()
                .map(productPriceUpdateRequestDtoMapper::mapToModel)
                .collect(Collectors.toList());
        List<Long> productPriceIds = productPrices.stream()
                .map(p -> p.getProduct().getId())
                .toList();
        List<ProductPrice> newProductPrices =
                coffeeShopUpdateRequestDto.getNewProductPrices().stream()
                .map(productPriceDtoMapper::mapToModel)
                .filter(p -> !productPriceIds.contains(p.getProduct().getId()))
                .toList();
        productPrices.addAll(newProductPrices);
        return productPrices;
    }
}
