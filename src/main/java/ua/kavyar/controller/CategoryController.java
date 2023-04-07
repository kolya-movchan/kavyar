package ua.kavyar.controller;

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
import ua.kavyar.dto.CategoryRequestDto;
import ua.kavyar.dto.CategoryResponseDto;
import ua.kavyar.dto.MessageResponseDto;
import ua.kavyar.model.Category;
import ua.kavyar.service.CategoryService;
import ua.kavyar.service.mapper.DtoMapper;
import ua.kavyar.service.mapper.ResponseDtoMapper;

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
    public CategoryResponseDto add(@RequestBody CategoryRequestDto categoryRequestDto) {
        return dtoMapper.mapToDto(categoryService.create(dtoMapper.mapToModel(categoryRequestDto)));
    }

    @GetMapping
    public List<CategoryResponseDto> getAll() {
        return categoryService.findAll().stream()
                .map(dtoMapper::mapToDto)
                .collect(Collectors.toList());
    }

    @GetMapping("/{id}")
    public CategoryResponseDto getById(@PathVariable Long id) {
        return dtoMapper.mapToDto(categoryService.getById(id));
    }

    @DeleteMapping("/{id}")
    public MessageResponseDto delete(@PathVariable Long id) {
        categoryService.delete(id);
        return messageResponseDtoMapper.mapToDto(MESSAGE);
    }

    @PutMapping("/{id}")
    public CategoryResponseDto update(@PathVariable Long id,
                                      @RequestBody CategoryRequestDto categoryRequestDto) {
        Category category = dtoMapper.mapToModel(categoryRequestDto);
        category.setId(id);
        return dtoMapper.mapToDto(categoryService.update(category));
    }
}
