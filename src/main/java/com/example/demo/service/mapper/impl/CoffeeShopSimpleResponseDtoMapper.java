package com.example.demo.service.mapper.impl;

import com.example.demo.dto.CoffeeShopSimpleResponseDto;
import com.example.demo.model.CoffeeShop;
import com.example.demo.service.mapper.ResponseDtoMapper;
import org.springframework.stereotype.Service;

@Service
public class CoffeeShopSimpleResponseDtoMapper implements
        ResponseDtoMapper<CoffeeShop, CoffeeShopSimpleResponseDto> {
    @Override
    public CoffeeShopSimpleResponseDto mapToDto(CoffeeShop coffeeShop) {
        CoffeeShopSimpleResponseDto coffeeShopSimpleResponseDto = new CoffeeShopSimpleResponseDto();
        coffeeShopSimpleResponseDto.setId(coffeeShop.getId());
        coffeeShopSimpleResponseDto.setIsDisable(coffeeShop.getIsDisable());
        coffeeShopSimpleResponseDto.setTitle(coffeeShop.getTitle());
        coffeeShopSimpleResponseDto.setOpen(coffeeShop.getOpen());
        coffeeShopSimpleResponseDto.setClose(coffeeShop.getClose());
        coffeeShopSimpleResponseDto.setLocation(coffeeShop.getLocation());
        coffeeShopSimpleResponseDto.setLogo(coffeeShop.getLogo().getUrl());
        return coffeeShopSimpleResponseDto;
    }
}
