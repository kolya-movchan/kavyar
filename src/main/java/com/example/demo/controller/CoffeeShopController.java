package com.example.demo.controller;

import com.example.demo.dto.CoffeeShopAddRequestDto;
import com.example.demo.dto.CoffeeShopResponseDto;
import com.example.demo.dto.CoffeeShopSimpleResponseDto;
import com.example.demo.dto.CoffeeShopUpdateRequestDto;
import com.example.demo.model.CoffeeShop;
import com.example.demo.service.CoffeeShopService;
import com.example.demo.service.mapper.DtoMapper;
import com.example.demo.service.mapper.RequestDtoMapper;
import com.example.demo.service.mapper.ResponseDtoMapper;
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
@RequestMapping("/coffee-shops")
public class CoffeeShopController {
    private final CoffeeShopService coffeeShopService;
    private final DtoMapper<CoffeeShop, CoffeeShopAddRequestDto, CoffeeShopResponseDto> dtoMapper;
    private final ResponseDtoMapper<
            CoffeeShop, CoffeeShopSimpleResponseDto> simpleResponseDtoMapper;
    private final RequestDtoMapper<CoffeeShop, CoffeeShopUpdateRequestDto> updateDtoMapper;

    public CoffeeShopController(
            CoffeeShopService coffeeShopService,
            DtoMapper<CoffeeShop, CoffeeShopAddRequestDto, CoffeeShopResponseDto> dtoMapper,
            ResponseDtoMapper<CoffeeShop, CoffeeShopSimpleResponseDto> simpleResponseDtoMapper,
            RequestDtoMapper<CoffeeShop, CoffeeShopUpdateRequestDto> updateDtoMapper) {
        this.coffeeShopService = coffeeShopService;
        this.dtoMapper = dtoMapper;
        this.simpleResponseDtoMapper = simpleResponseDtoMapper;
        this.updateDtoMapper = updateDtoMapper;
    }

    @PostMapping
    public CoffeeShopResponseDto add(@RequestBody CoffeeShopAddRequestDto coffeeShopAddRequestDto) {
        return dtoMapper.mapToDto(
                coffeeShopService.create(dtoMapper.mapToModel(coffeeShopAddRequestDto)));
    }

    @GetMapping
    public List<CoffeeShopSimpleResponseDto> getAll() {
        return coffeeShopService.findAll().stream()
                .map(simpleResponseDtoMapper::mapToDto)
                .collect(Collectors.toList());
    }

    @GetMapping("/get/{id}")
    public CoffeeShopResponseDto getById(@PathVariable Long id) {
        return dtoMapper.mapToDto(coffeeShopService.getById(id));
    }

    @DeleteMapping("/delete/{id}")
    public CoffeeShopResponseDto delete(@PathVariable Long id) {
        return dtoMapper.mapToDto(coffeeShopService.delete(id));
    }

    @PutMapping("/restore/{id}")
    public CoffeeShopResponseDto restore(@PathVariable Long id) {
        return dtoMapper.mapToDto(coffeeShopService.restore(id));
    }

    @PutMapping("/update")
    public CoffeeShopResponseDto update(
            @RequestBody CoffeeShopUpdateRequestDto coffeeShopUpdateRequestDto) {
        return dtoMapper.mapToDto(coffeeShopService.update(
                updateDtoMapper.mapToModel(coffeeShopUpdateRequestDto)));
    }
}
