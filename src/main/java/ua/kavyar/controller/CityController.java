package ua.kavyar.controller;

import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.media.ArraySchema;
import io.swagger.v3.oas.annotations.media.Content;
import io.swagger.v3.oas.annotations.media.Schema;
import io.swagger.v3.oas.annotations.responses.ApiResponse;
import io.swagger.v3.oas.annotations.tags.Tag;
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
import ua.kavyar.dto.CityRequestDto;
import ua.kavyar.dto.CityResponseDto;
import ua.kavyar.dto.MessageResponseDto;
import ua.kavyar.model.City;
import ua.kavyar.service.CityService;
import ua.kavyar.service.mapper.DtoMapper;
import ua.kavyar.service.mapper.ResponseDtoMapper;

@Tag(name = "City", description = "City API")
@RestController
@RequestMapping("/cities")
public class CityController {

    private static final String MESSAGE = "Success!";

    private final CityService cityService;
    private final DtoMapper<City, CityRequestDto, CityResponseDto> dtoMapper;
    private final ResponseDtoMapper<String, MessageResponseDto> messageResponseDtoMapper;

    public CityController(CityService cityService,
                          DtoMapper<City, CityRequestDto, CityResponseDto> dtoMapper,
                          ResponseDtoMapper<String, MessageResponseDto> messageResponseDtoMapper) {
        this.cityService = cityService;
        this.dtoMapper = dtoMapper;
        this.messageResponseDtoMapper = messageResponseDtoMapper;
    }

    @PostMapping
    @Operation(summary = "create city", tags = "city")
    @ApiResponse(responseCode = "200", description = "city created",
            content = {@Content(mediaType = "application/json",
                    schema = @Schema(implementation = CityResponseDto.class))})
    public CityResponseDto add(@RequestBody CityRequestDto cityRequestDto) {
        return dtoMapper.mapToDto(cityService.create(dtoMapper.mapToModel(cityRequestDto)));
    }

    @GetMapping
    @Operation(summary = "get all cities", tags = "city")
    @ApiResponse(responseCode = "200", description = "all cities",
            content = {@Content(mediaType = "application/json",
                    array = @ArraySchema(schema = @Schema(
                            implementation = CityResponseDto.class)))})
    public List<CityResponseDto> getAll() {
        return cityService.findAll().stream()
                .map(dtoMapper::mapToDto)
                .collect(Collectors.toList());
    }

    @GetMapping("/{id}")
    @Operation(summary = "get city by id", tags = "city")
    @ApiResponse(responseCode = "200", description = "city by id",
            content = {@Content(mediaType = "application/json",
                    schema = @Schema(implementation = CityResponseDto.class))})
    public CityResponseDto getById(@PathVariable Long id) {
        return dtoMapper.mapToDto(cityService.getById(id));
    }

    @DeleteMapping("/{id}")
    @Operation(summary = "delete city by id", tags = "city")
    @ApiResponse(responseCode = "200", description = "city deleted by id",
            content = {@Content(mediaType = "application/json",
                    schema = @Schema(implementation = MessageResponseDto.class))})
    public MessageResponseDto delete(@PathVariable Long id) {
        cityService.delete(id);
        return messageResponseDtoMapper.mapToDto(MESSAGE);
    }

    @PutMapping("/{id}")
    @Operation(summary = "update city by id", tags = "city")
    @ApiResponse(responseCode = "200", description = "city updated by id",
            content = {@Content(mediaType = "application/json",
                    schema = @Schema(implementation = CityResponseDto.class))})
    public CityResponseDto update(@PathVariable Long id,
                                  @RequestBody CityRequestDto cityRequestDto) {
        City city = dtoMapper.mapToModel(cityRequestDto);
        city.setId(id);
        return dtoMapper.mapToDto(cityService.update(city));
    }
}
