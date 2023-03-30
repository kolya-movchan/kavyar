package com.example.demo.controller;

import com.example.demo.dto.CityRequestDto;
import com.example.demo.dto.CityResponseDto;
import com.example.demo.model.City;
import com.example.demo.service.CityService;
import com.example.demo.service.mapper.DtoMapper;
import lombok.extern.log4j.Log4j2;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.stream.Collectors;

@Log4j2
@RestController
@RequestMapping("/cities")
public class CityController {
    private final CityService cityService;
    private final DtoMapper<City, CityRequestDto, CityResponseDto> dtoMapper;

    public CityController(CityService cityService, DtoMapper<City, CityRequestDto, CityResponseDto> dtoMapper) {
        this.cityService = cityService;
        this.dtoMapper = dtoMapper;
    }

    @PostMapping("/create")
    public CityResponseDto addCity(@RequestBody CityRequestDto cityRequestDto) {
        return dtoMapper.mapToDto(cityService.create(dtoMapper.mapToModel(cityRequestDto)));
    }

    @GetMapping
    public List<CityResponseDto> getAll() {
        return cityService.findAll().stream()
                .map(dtoMapper::mapToDto)
                .collect(Collectors.toList());
    }

    @GetMapping("/{id}")
    public CityResponseDto getCityById(@PathVariable Long id) {
        return dtoMapper.mapToDto(cityService.getById(id));
    }

    @DeleteMapping("/delete/{id}")
    public void deleteCity(@PathVariable Long id) {
        cityService.delete(id);
    }
}
