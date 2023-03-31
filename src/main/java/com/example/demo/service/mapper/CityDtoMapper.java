package com.example.demo.service.mapper;

import com.example.demo.dto.CityRequestDto;
import com.example.demo.dto.CityResponseDto;
import com.example.demo.model.City;
import com.example.demo.service.DtoMapper;
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
