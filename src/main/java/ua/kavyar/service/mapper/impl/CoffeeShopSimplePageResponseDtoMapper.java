package ua.kavyar.service.mapper.impl;

import java.util.stream.Collectors;
import org.springframework.data.domain.Page;
import org.springframework.stereotype.Service;
import ua.kavyar.dto.CoffeeShopSimplePageResponseDto;
import ua.kavyar.dto.CoffeeShopSimpleResponseDto;
import ua.kavyar.model.CoffeeShop;
import ua.kavyar.service.mapper.ResponseDtoMapper;

@Service
public class CoffeeShopSimplePageResponseDtoMapper
        implements ResponseDtoMapper<
        Page<CoffeeShop>, CoffeeShopSimplePageResponseDto> {

    private final ResponseDtoMapper<
            CoffeeShop, CoffeeShopSimpleResponseDto> simpleResponseDtoMapper;

    public CoffeeShopSimplePageResponseDtoMapper(ResponseDtoMapper<
            CoffeeShop, CoffeeShopSimpleResponseDto> simpleResponseDtoMapper) {
        this.simpleResponseDtoMapper = simpleResponseDtoMapper;
    }

    @Override
    public CoffeeShopSimplePageResponseDto mapToDto(Page<CoffeeShop> coffeeShops) {
        CoffeeShopSimplePageResponseDto coffeeShopSimplePageResponseDto =
                new CoffeeShopSimplePageResponseDto();
        coffeeShopSimplePageResponseDto.setHasNextPage(coffeeShops.hasNext());
        coffeeShopSimplePageResponseDto.setCoffeeShops(coffeeShops.stream()
                .map(simpleResponseDtoMapper::mapToDto)
                .collect(Collectors.toList()));
        return coffeeShopSimplePageResponseDto;
    }
}
