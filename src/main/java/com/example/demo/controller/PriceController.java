package com.example.demo.controller;

import com.example.demo.dto.CoffeeShopPriceResponseDto;
import com.example.demo.dto.PriceRequestDto;
import com.example.demo.dto.PriceResponseDto;
import com.example.demo.model.Price;
import com.example.demo.service.DtoMapper;
import com.example.demo.service.PriceService;
import com.example.demo.service.mapper.CoffeeShopPriceMapper;
import java.util.List;
import java.util.stream.Collectors;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/prices")
public class PriceController {
    private final PriceService priceService;
    private final DtoMapper<Price, PriceRequestDto, PriceResponseDto> dtoMapper;
    private final CoffeeShopPriceMapper coffeeShopPriceMapper;

    public PriceController(
            PriceService priceService,
            DtoMapper<Price, PriceRequestDto, PriceResponseDto> dtoMapper,
            CoffeeShopPriceMapper coffeeShopPriceMapper) {
        this.priceService = priceService;
        this.dtoMapper = dtoMapper;
        this.coffeeShopPriceMapper = coffeeShopPriceMapper;
    }

    @PostMapping
    public PriceResponseDto add(@RequestBody PriceRequestDto priceRequestDto) {
        return dtoMapper.mapToDto(priceService.create(dtoMapper.mapToModel(priceRequestDto)));
    }

    @GetMapping("/{coffeeShopId}")
    public List<PriceResponseDto> getAllByCoffeeShop(@PathVariable Long coffeeShopId) {
        return priceService.findAllByCoffeeShopId(coffeeShopId).stream()
                .map(dtoMapper::mapToDto)
                .collect(Collectors.toList());
    }

    @GetMapping("/full-price/{coffeeShopId}")
    public CoffeeShopPriceResponseDto getCoffeeShopPrice(@PathVariable Long coffeeShopId) {
        return coffeeShopPriceMapper.mapToDto(coffeeShopId,
                priceService.findAllByCoffeeShopId(coffeeShopId));
    }

    @DeleteMapping
    public void delete(@RequestBody PriceRequestDto priceRequestDto) {
        priceService.delete(dtoMapper.mapToModel(priceRequestDto));
    }

    @PutMapping
    public PriceResponseDto update(@RequestBody PriceRequestDto priceRequestDto) {
        return dtoMapper.mapToDto(priceService.update(dtoMapper.mapToModel(priceRequestDto)));
    }
}
