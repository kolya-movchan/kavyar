package com.example.demo.service.mapper.impl;

import com.example.demo.dto.CityRequestDto;
import com.example.demo.dto.CityResponseDto;
import com.example.demo.dto.CoffeeShopCreateRequestDto;
import com.example.demo.dto.CoffeeShopResponseDto;
import com.example.demo.dto.FeatureRequestDto;
import com.example.demo.dto.FeatureResponseDto;
import com.example.demo.dto.PhotoRequestDto;
import com.example.demo.dto.PhotoResponseDto;
import com.example.demo.dto.ProductPriceRequestDto;
import com.example.demo.dto.ProductPriceResponseDto;
import com.example.demo.model.City;
import com.example.demo.model.CoffeeShop;
import com.example.demo.model.Feature;
import com.example.demo.model.Photo;
import com.example.demo.model.ProductPrice;
import com.example.demo.service.CityService;
import com.example.demo.service.FeatureService;
import com.example.demo.service.PhotoService;
import com.example.demo.service.mapper.DtoMapper;
import java.util.stream.Collectors;
import org.springframework.stereotype.Service;

@Service
public class CoffeeShopDtoMapper implements
        DtoMapper<CoffeeShop, CoffeeShopCreateRequestDto, CoffeeShopResponseDto> {
    private static final boolean DEFAULT_IS_DISABLE_COFFEE_SHOP = false;
    private final DtoMapper<City, CityRequestDto, CityResponseDto> cityDtoMapper;
    private final DtoMapper<Photo, PhotoRequestDto, PhotoResponseDto> photoDtoMapper;
    private final DtoMapper<Feature, FeatureRequestDto, FeatureResponseDto> featureDtoMapper;
    private final DtoMapper<ProductPrice, ProductPriceRequestDto,
            ProductPriceResponseDto> productPriceDtoMapper;
    private final CityService cityService;
    private final PhotoService photoService;
    private final FeatureService featureService;

    public CoffeeShopDtoMapper(
            DtoMapper<City, CityRequestDto, CityResponseDto> cityDtoMapper,
            DtoMapper<Photo, PhotoRequestDto, PhotoResponseDto> photoDtoMapper,
            DtoMapper<Feature, FeatureRequestDto, FeatureResponseDto> featureDtoMapper,
            DtoMapper<ProductPrice, ProductPriceRequestDto,
                    ProductPriceResponseDto> productPriceDtoMapper,
            CityService cityService, PhotoService photoService,
            FeatureService featureService) {
        this.cityDtoMapper = cityDtoMapper;
        this.photoDtoMapper = photoDtoMapper;
        this.featureDtoMapper = featureDtoMapper;
        this.productPriceDtoMapper = productPriceDtoMapper;
        this.cityService = cityService;
        this.photoService = photoService;
        this.featureService = featureService;
    }

    @Override
    public CoffeeShopResponseDto mapToDto(CoffeeShop coffeeShop) {
        CoffeeShopResponseDto coffeeShopResponseDto = new CoffeeShopResponseDto();
        coffeeShopResponseDto.setId(coffeeShop.getId());
        coffeeShopResponseDto.setCity(cityDtoMapper.mapToDto(coffeeShop.getCity()));
        coffeeShopResponseDto.setIsDisable(coffeeShop.getIsDisable());
        coffeeShopResponseDto.setTitle(coffeeShop.getTitle());
        coffeeShopResponseDto.setDescription(coffeeShop.getDescription());
        coffeeShopResponseDto.setPhone(coffeeShop.getPhone());
        coffeeShopResponseDto.setOpen(coffeeShop.getOpen());
        coffeeShopResponseDto.setClose(coffeeShop.getClose());
        coffeeShopResponseDto.setUrl(coffeeShop.getUrl());
        coffeeShopResponseDto.setLocation(coffeeShop.getLocation());
        coffeeShopResponseDto.setLogo(coffeeShop.getLogo().getUrl());
        coffeeShopResponseDto.setPhotos(coffeeShop.getPhotos().stream()
                .map(photoDtoMapper::mapToDto)
                .collect(Collectors.toList()));
        coffeeShopResponseDto.setFeatures(coffeeShop.getFeatures().stream()
                .map(featureDtoMapper::mapToDto)
                .collect(Collectors.toList()));
        coffeeShopResponseDto.setProductPrices(coffeeShop.getProducts().stream()
                .map(productPriceDtoMapper::mapToDto)
                .sorted((p1, p2) ->
                        Math.toIntExact(p1.getProduct().getCategory().getId()
                                - p2.getProduct().getCategory().getId()))
                .collect(Collectors.toList()));
        return coffeeShopResponseDto;
    }

    @Override
    public CoffeeShop mapToModel(CoffeeShopCreateRequestDto coffeeShopCreateRequestDto) {
        CoffeeShop coffeeShop = new CoffeeShop();
        coffeeShop.setCity(cityService.getById(coffeeShopCreateRequestDto.getCityId()));
        coffeeShop.setIsDisable(DEFAULT_IS_DISABLE_COFFEE_SHOP);
        coffeeShop.setTitle(coffeeShopCreateRequestDto.getTitle());
        coffeeShop.setDescription(coffeeShopCreateRequestDto.getDescription());
        coffeeShop.setPhone(coffeeShopCreateRequestDto.getPhone());
        coffeeShop.setOpen(coffeeShopCreateRequestDto.getOpen());
        coffeeShop.setClose(coffeeShopCreateRequestDto.getClose());
        coffeeShop.setUrl(coffeeShopCreateRequestDto.getUrl());
        coffeeShop.setLocation(coffeeShopCreateRequestDto.getLocation());
        coffeeShop.setLogo(photoService.getById(coffeeShopCreateRequestDto.getLogoId()));
        coffeeShop.setPhotos(coffeeShopCreateRequestDto.getPhotos().stream()
                .map(photoService::getById).collect(Collectors.toList()));
        coffeeShop.setFeatures(coffeeShopCreateRequestDto.getFeatures().stream()
                .map(featureService::getById).collect(Collectors.toList()));
        coffeeShop.setProducts(coffeeShopCreateRequestDto.getProductPrices().stream()
                .map(productPriceDtoMapper::mapToModel)
                .collect(Collectors.toList()));
        return coffeeShop;
    }
}
