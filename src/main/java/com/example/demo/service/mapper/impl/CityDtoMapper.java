package com.example.demo.service.mapper.impl;

import com.example.demo.dto.auxiliary.CityRequestDto;
import com.example.demo.dto.auxiliary.CityResponseDto;
import com.example.demo.model.City;
import com.example.demo.service.mapper.DtoMapper;
import org.springframework.stereotype.Service;

@Service
public class CityDtoMapper implements DtoMapper<City, CityRequestDto, CityResponseDto> {
    @Override
    public CityResponseDto mapToDto(City city) {
        CityResponseDto cityResponseDto = new CityResponseDto();
        cityResponseDto.setId(city.getId());
        cityResponseDto.setName(city.getName());
        return cityResponseDto;
    }

    @Override
    public City mapToModel(CityRequestDto cityRequestDto) {
        City city = new City();
        city.setName(cityRequestDto.getName());
        return city;
    }
}
