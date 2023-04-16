package ua.kavyar.controller;

import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.stream.Collectors;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.Parameter;
import io.swagger.v3.oas.annotations.media.ArraySchema;
import io.swagger.v3.oas.annotations.media.Content;
import io.swagger.v3.oas.annotations.media.Schema;
import io.swagger.v3.oas.annotations.responses.ApiResponse;
import io.swagger.v3.oas.annotations.tags.Tag;
import org.springframework.data.domain.Page;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import ua.kavyar.dto.*;
import ua.kavyar.model.CoffeeShop;
import ua.kavyar.service.CoffeeShopService;
import ua.kavyar.service.mapper.DtoMapper;
import ua.kavyar.service.mapper.RequestDtoMapper;
import ua.kavyar.service.mapper.ResponseDtoMapper;
import ua.kavyar.service.mapper.impl.CoffeeShopSimplePageResponseDtoMapper;

@Tag(name = "CoffeeShop", description = "CoffeeShop API")
@RestController
@RequestMapping("/coffee-shops")
public class CoffeeShopController {

    private final CoffeeShopService coffeeShopService;
    private final DtoMapper<CoffeeShop,
            CoffeeShopCreateRequestDto, CoffeeShopResponseDto> coffeeShopDtoMapper;
    private final ResponseDtoMapper<
            CoffeeShop, CoffeeShopSimpleResponseDto> simpleResponseDtoMapper;
    private final RequestDtoMapper<CoffeeShop, CoffeeShopUpdateRequestDto> updateDtoMapper;
    private final ResponseDtoMapper<
            Page<CoffeeShop>, CoffeeShopSimplePageResponseDto> coffeeShopPageResponseDtoMapper;

    public CoffeeShopController(
            CoffeeShopService coffeeShopService,
            DtoMapper<CoffeeShop,
                    CoffeeShopCreateRequestDto, CoffeeShopResponseDto> coffeeShopDtoMapper,
            ResponseDtoMapper<CoffeeShop, CoffeeShopSimpleResponseDto> simpleResponseDtoMapper,
            RequestDtoMapper<CoffeeShop, CoffeeShopUpdateRequestDto> updateDtoMapper, ResponseDtoMapper<Page<CoffeeShop>, CoffeeShopSimplePageResponseDto> coffeeShopPageResponseDtoMapper) {
        this.coffeeShopService = coffeeShopService;
        this.coffeeShopDtoMapper = coffeeShopDtoMapper;
        this.simpleResponseDtoMapper = simpleResponseDtoMapper;
        this.updateDtoMapper = updateDtoMapper;
        this.coffeeShopPageResponseDtoMapper = coffeeShopPageResponseDtoMapper;
    }

    @PostMapping
    @Operation(summary = "create coffee shop", tags = "coffee shop")
    @ApiResponse(responseCode = "200", description = "coffee shop created",
            content = {@Content(mediaType = "application/json",
                    schema = @Schema(implementation = CoffeeShopResponseDto.class))})
    public CoffeeShopResponseDto add(
            @RequestBody CoffeeShopCreateRequestDto coffeeShopCreateRequestDto) {
        return coffeeShopDtoMapper.mapToDto(
                coffeeShopService.create(
                        coffeeShopDtoMapper.mapToModel(coffeeShopCreateRequestDto)));
    }

//    @GetMapping
//    @Operation(summary = "get all coffee shops", tags = "coffee shop")
//    @ApiResponse(responseCode = "200", description = "all coffee shops",
//            content = {@Content(mediaType = "application/json",
//                    array = @ArraySchema(schema = @Schema(
//                            implementation = CoffeeShopSimpleResponseDto.class)))})
//    @Parameter(name = "city",
//            description = "Expected city id. "
//                    + "Example: city=1",
//            schema = @Schema(implementation = Long.class))
//    @Parameter(name = "sortBy",
//            description = "Expected field is one of ('title', 'open', 'close') "
//                    + "and direction of sort - ('ASC', 'DESC'). "
//                    + "Example: sortBy=title:DESC. "
//                    + "Default: ???",
//            schema = @Schema(implementation = String.class))
//    @Parameter(name = "count",
//            description = "Expected number of coffee shops to display per page. "
//                    + "Example: count=5 "
//                    + "Default: ???",
//            schema = @Schema(implementation = Integer.class))
//    @Parameter(name = "page",
//            description = "",
//            schema = @Schema(implementation = Integer.class))
//    @Parameter(name = "filter",
//            description = "",
//            schema = @Schema(implementation = Long.class))
//    @Parameter(name = "search",
//            description = "",
//            schema = @Schema(implementation = String.class))
//    public Map<String, Object> getAll(
//            @RequestParam Map<String, String> params) {
//        Map<String, Object> map = new HashMap<>();
//        Page<CoffeeShop> allCoffeeShopsPage = coffeeShopService.findAll(params);
//        boolean hasNextCoffeeShop = allCoffeeShopsPage.hasNext();
//        map.put("hasNextPage", hasNextCoffeeShop);
//        List<CoffeeShopSimpleResponseDto> allCoffeeShopsPageList
//                = allCoffeeShopsPage.stream()
//                .map(simpleResponseDtoMapper::mapToDto)
//                .collect(Collectors.toList());
//        map.put("coffeeShops", allCoffeeShopsPageList);
//        return
//                map;
//    }

    @GetMapping
    @Operation(summary = "get all coffee shops", tags = "coffee shop")
    @ApiResponse(responseCode = "200", description = "all coffee shops",
            content = {@Content(mediaType = "application/json",
                    array = @ArraySchema(schema = @Schema(
                            implementation = CoffeeShopSimpleResponseDto.class)))})
    @Parameter(name = "city",
            description = "Expected city id. "
                    + "Example: city=1",
            schema = @Schema(implementation = Long.class))
    @Parameter(name = "sortBy",
            description = "Expected field is one of ('title', 'open', 'close') "
                    + "and direction of sort - ('ASC', 'DESC'). "
                    + "Example: sortBy=title:DESC. "
                    + "Default: ???",
            schema = @Schema(implementation = String.class))
    @Parameter(name = "count",
            description = "Expected number of coffee shops to display per page. "
                    + "Example: count=5 "
                    + "Default: ???",
            schema = @Schema(implementation = Integer.class))
    @Parameter(name = "page",
            description = "",
            schema = @Schema(implementation = Integer.class))
    @Parameter(name = "filter",
            description = "",
            schema = @Schema(implementation = Long.class))
    @Parameter(name = "search",
            description = "",
            schema = @Schema(implementation = String.class))
    public CoffeeShopSimplePageResponseDto getAll(
            @RequestParam Map<String, String> params) {
        return coffeeShopPageResponseDtoMapper.mapToDto(coffeeShopService.findAll(params));
    }

    @GetMapping("/get/{id}")
    @Operation(summary = "get coffee shop by id", tags = "coffee shop")
    @ApiResponse(responseCode = "200", description = "coffee shop by id",
            content = {@Content(mediaType = "application/json",
                    schema = @Schema(implementation = CoffeeShopResponseDto.class))})
    public CoffeeShopResponseDto getById(@PathVariable Long id) {
        return coffeeShopDtoMapper.mapToDto(coffeeShopService.getById(id));
    }

    @DeleteMapping("/delete/{id}")
    @Operation(summary = "delete coffee shop by id", tags = "coffee shop")
    @ApiResponse(responseCode = "200", description = "coffee shop deleted by id",
            content = {@Content(mediaType = "application/json",
                    schema = @Schema(implementation = CoffeeShopResponseDto.class))})
    public CoffeeShopResponseDto delete(@PathVariable Long id) {
        return coffeeShopDtoMapper.mapToDto(coffeeShopService.delete(id));
    }

    @PutMapping("/restore/{id}")
    @Operation(summary = "restore coffee shop by id", tags = "coffee shop")
    @ApiResponse(responseCode = "200", description = "coffee shop restored by id",
            content = {@Content(mediaType = "application/json",
                    schema = @Schema(implementation = CoffeeShopResponseDto.class))})
    public CoffeeShopResponseDto restore(@PathVariable Long id) {
        return coffeeShopDtoMapper.mapToDto(coffeeShopService.restore(id));
    }

    @PutMapping("/update")
    @Operation(summary = "update coffee shop by id", tags = "coffee shop")
    @ApiResponse(responseCode = "200", description = "coffee shop updated by id",
            content = {@Content(mediaType = "application/json",
                    schema = @Schema(implementation = CoffeeShopResponseDto.class))})
    public CoffeeShopResponseDto update(
            @RequestBody CoffeeShopUpdateRequestDto coffeeShopUpdateRequestDto) {
        return coffeeShopDtoMapper.mapToDto(coffeeShopService.update(
                updateDtoMapper.mapToModel(coffeeShopUpdateRequestDto)));
    }
}
