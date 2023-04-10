package ua.kavyar.controller;

import java.util.List;
import java.util.Map;
import java.util.stream.Collectors;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.media.ArraySchema;
import io.swagger.v3.oas.annotations.media.Content;
import io.swagger.v3.oas.annotations.media.Schema;
import io.swagger.v3.oas.annotations.responses.ApiResponse;
import io.swagger.v3.oas.annotations.tags.Tag;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import ua.kavyar.dto.FeatureRequestDto;
import ua.kavyar.dto.FeatureResponseDto;
import ua.kavyar.dto.MessageResponseDto;
import ua.kavyar.model.Feature;
import ua.kavyar.service.FeatureService;
import ua.kavyar.service.mapper.DtoMapper;
import ua.kavyar.service.mapper.ResponseDtoMapper;

@Tag(name = "Feature", description = "Feature API")
@RestController
@RequestMapping("/features")
public class FeatureController {

    private static final String MESSAGE = "Success!";

    private final FeatureService featureService;
    private final DtoMapper<Feature, FeatureRequestDto, FeatureResponseDto> dtoMapper;
    private final ResponseDtoMapper<String, MessageResponseDto> messageResponseDtoMapper;

    public FeatureController(FeatureService featureService,
                             DtoMapper<Feature, FeatureRequestDto, FeatureResponseDto> dtoMapper,
                             ResponseDtoMapper<String,
                                     MessageResponseDto> messageResponseDtoMapper) {
        this.featureService = featureService;
        this.dtoMapper = dtoMapper;
        this.messageResponseDtoMapper = messageResponseDtoMapper;
    }

    @PostMapping
    @Operation(summary = "create feature", tags = "feature")
    @ApiResponse(responseCode = "200", description = "feature created",
            content = {@Content(mediaType = "application/json",
                    schema = @Schema(implementation = FeatureResponseDto.class))})
    public FeatureResponseDto add(@RequestBody FeatureRequestDto featureRequestDto) {
        return dtoMapper.mapToDto(featureService.create(dtoMapper.mapToModel(featureRequestDto)));
    }

    @GetMapping
    @Operation(summary = "get all features", tags = "feature")
    @ApiResponse(responseCode = "200", description = "all features",
            content = {@Content(mediaType = "application/json",
                    array = @ArraySchema(schema = @Schema(
                            implementation = FeatureResponseDto.class)))})
    public List<FeatureResponseDto> getAll(
            @RequestParam Map<String, String> params) {
        return featureService.findAll(params).stream()
                .map(dtoMapper::mapToDto)
                .collect(Collectors.toList());
    }

    @GetMapping("/{id}")
    @Operation(summary = "get feature by id", tags = "feature")
    @ApiResponse(responseCode = "200", description = "feature by id",
            content = {@Content(mediaType = "application/json",
                    schema = @Schema(implementation = FeatureResponseDto.class))})
    public FeatureResponseDto getById(@PathVariable Long id) {
        return dtoMapper.mapToDto(featureService.getById(id));
    }

    @DeleteMapping("/{id}")
    @Operation(summary = "delete feature by id", tags = "feature")
    @ApiResponse(responseCode = "200", description = "feature deleted by id",
            content = {@Content(mediaType = "application/json",
                    schema = @Schema(implementation = MessageResponseDto.class))})
    public MessageResponseDto delete(@PathVariable Long id) {
        featureService.delete(id);
        return messageResponseDtoMapper.mapToDto(MESSAGE);
    }

    @PutMapping("/{id}")
    @Operation(summary = "update feature by id", tags = "feature")
    @ApiResponse(responseCode = "200", description = "feature updated by id",
            content = {@Content(mediaType = "application/json",
                    schema = @Schema(implementation = FeatureResponseDto.class))})
    public FeatureResponseDto update(@PathVariable Long id,
                                     @RequestBody FeatureRequestDto featureRequestDto) {
        Feature feature = dtoMapper.mapToModel(featureRequestDto);
        feature.setId(id);
        return dtoMapper.mapToDto(featureService.update(feature));
    }
}
