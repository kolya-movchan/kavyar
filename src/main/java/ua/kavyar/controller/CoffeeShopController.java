package ua.kavyar.controller;

import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.Parameter;
import io.swagger.v3.oas.annotations.media.ArraySchema;
import io.swagger.v3.oas.annotations.media.Content;
import io.swagger.v3.oas.annotations.media.Schema;
import io.swagger.v3.oas.annotations.responses.ApiResponse;
import io.swagger.v3.oas.annotations.tags.Tag;
import java.util.List;
import java.util.Map;
import java.util.stream.Collectors;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import ua.kavyar.dto.CoffeeShopCreateRequestDto;
import ua.kavyar.dto.CoffeeShopResponseDto;
import ua.kavyar.dto.CoffeeShopSimpleResponseDto;
import ua.kavyar.dto.CoffeeShopUpdateRequestDto;
import ua.kavyar.model.CoffeeShop;
import ua.kavyar.service.CoffeeShopService;
import ua.kavyar.service.mapper.DtoMapper;
import ua.kavyar.service.mapper.RequestDtoMapper;
import ua.kavyar.service.mapper.ResponseDtoMapper;

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

    public CoffeeShopController(
            CoffeeShopService coffeeShopService,
            DtoMapper<CoffeeShop,
                    CoffeeShopCreateRequestDto, CoffeeShopResponseDto> coffeeShopDtoMapper,
            ResponseDtoMapper<CoffeeShop, CoffeeShopSimpleResponseDto> simpleResponseDtoMapper,
            RequestDtoMapper<CoffeeShop, CoffeeShopUpdateRequestDto> updateDtoMapper) {
        this.coffeeShopService = coffeeShopService;
        this.coffeeShopDtoMapper = coffeeShopDtoMapper;
        this.simpleResponseDtoMapper = simpleResponseDtoMapper;
        this.updateDtoMapper = updateDtoMapper;
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

    @GetMapping
    @Operation(summary = "get all coffee shops", tags = "coffee shop")
    @ApiResponse(responseCode = "200", description = "all coffee shops",
            content = {@Content(mediaType = "application/json",
                    array = @ArraySchema(schema = @Schema(
                            implementation = CoffeeShopSimpleResponseDto.class)))})
    @Parameter(name = "city", schema = @Schema(implementation = Long.class))
    @Parameter(name = "sortBy", schema = @Schema(implementation = String.class))
    @Parameter(name = "count", schema = @Schema(implementation = Integer.class))
    @Parameter(name = "page", schema = @Schema(implementation = Integer.class))
    @Parameter(name = "filter", schema = @Schema(implementation = Long.class))
    @Parameter(name = "search", schema = @Schema(implementation = String.class))
    public List<CoffeeShopSimpleResponseDto> getAll(
            @RequestParam Map<String, String> params) {
        return coffeeShopService.findAll(params).stream()
                .map(simpleResponseDtoMapper::mapToDto)
                .collect(Collectors.toList());
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
