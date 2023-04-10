package ua.kavyar.controller;

import io.swagger.v3.oas.annotations.Operation;
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
import ua.kavyar.dto.CategoryRequestDto;
import ua.kavyar.dto.CategoryResponseDto;
import ua.kavyar.dto.MessageResponseDto;
import ua.kavyar.model.Category;
import ua.kavyar.service.CategoryService;
import ua.kavyar.service.mapper.DtoMapper;
import ua.kavyar.service.mapper.ResponseDtoMapper;

@Tag(name = "Category", description = "Category API")
@RestController
@RequestMapping("/categories")
public class CategoryController {

    private static final String MESSAGE = "Success!";

    private final CategoryService categoryService;
    private final DtoMapper<Category, CategoryRequestDto, CategoryResponseDto> dtoMapper;
    private final ResponseDtoMapper<String, MessageResponseDto> messageResponseDtoMapper;

    public CategoryController(CategoryService categoryService,
                              DtoMapper<Category,
                                      CategoryRequestDto, CategoryResponseDto> dtoMapper,
                              ResponseDtoMapper<String,
                                      MessageResponseDto> messageResponseDtoMapper) {
        this.categoryService = categoryService;
        this.dtoMapper = dtoMapper;
        this.messageResponseDtoMapper = messageResponseDtoMapper;
    }

    @PostMapping
    @Operation(summary = "create category", tags = "category")
    @ApiResponse(responseCode = "200", description = "category created",
            content = {@Content(mediaType = "application/json",
                    schema = @Schema(implementation = CategoryResponseDto.class))})
    public CategoryResponseDto add(@RequestBody CategoryRequestDto categoryRequestDto) {
        return dtoMapper.mapToDto(categoryService.create(dtoMapper.mapToModel(categoryRequestDto)));
    }

    @GetMapping
    @Operation(summary = "get all categories", tags = "category")
    @ApiResponse(responseCode = "200", description = "all categories",
            content = {@Content(mediaType = "application/json",
                    array = @ArraySchema(schema = @Schema(
                            implementation = CategoryResponseDto.class)))})
    public List<CategoryResponseDto> getAll(
            @RequestParam Map<String, String> params) {
        return categoryService.findAll(params).stream()
                .map(dtoMapper::mapToDto)
                .collect(Collectors.toList());
    }

    @GetMapping("/{id}")
    @Operation(summary = "get category by id", tags = "category")
    @ApiResponse(responseCode = "200", description = "category by id",
            content = {@Content(mediaType = "application/json",
                    schema = @Schema(implementation = CategoryResponseDto.class))})
    public CategoryResponseDto getById(@PathVariable Long id) {
        return dtoMapper.mapToDto(categoryService.getById(id));
    }

    @DeleteMapping("/{id}")
    @Operation(summary = "delete category by id", tags = "category")
    @ApiResponse(responseCode = "200", description = "category deleted by id",
            content = {@Content(mediaType = "application/json",
                    schema = @Schema(implementation = MessageResponseDto.class))})
    public MessageResponseDto delete(@PathVariable Long id) {
        categoryService.delete(id);
        return messageResponseDtoMapper.mapToDto(MESSAGE);
    }

    @PutMapping("/{id}")
    @Operation(summary = "update category by id", tags = "category")
    @ApiResponse(responseCode = "200", description = "category updated by id",
            content = {@Content(mediaType = "application/json",
                    schema = @Schema(implementation = CategoryResponseDto.class))})
    public CategoryResponseDto update(@PathVariable Long id,
                                      @RequestBody CategoryRequestDto categoryRequestDto) {
        Category category = dtoMapper.mapToModel(categoryRequestDto);
        category.setId(id);
        return dtoMapper.mapToDto(categoryService.update(category));
    }
}
