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
import ua.kavyar.dto.MessageResponseDto;
import ua.kavyar.dto.ProductRequestDto;
import ua.kavyar.dto.ProductResponseDto;
import ua.kavyar.model.Product;
import ua.kavyar.service.ProductService;
import ua.kavyar.service.mapper.DtoMapper;
import ua.kavyar.service.mapper.ResponseDtoMapper;

@RestController
@RequestMapping("/products")
public class ProductController {

    private static final String MESSAGE = "Success!";

    private final ProductService productService;
    private final DtoMapper<Product, ProductRequestDto, ProductResponseDto> dtoMapper;
    private final ResponseDtoMapper<String, MessageResponseDto> messageResponseDtoMapper;

    public ProductController(ProductService productService,
                             DtoMapper<Product, ProductRequestDto, ProductResponseDto> dtoMapper,
                             ResponseDtoMapper<String,
                                     MessageResponseDto> messageResponseDtoMapper) {
        this.productService = productService;
        this.dtoMapper = dtoMapper;
        this.messageResponseDtoMapper = messageResponseDtoMapper;
    }

    @PostMapping
    public ProductResponseDto add(@RequestBody ProductRequestDto productRequestDto) {
        return dtoMapper.mapToDto(
                productService.create(dtoMapper.mapToModel(productRequestDto)));
    }

    @GetMapping
    public List<ProductResponseDto> getAll() {
        return productService.findAll().stream()
                .map(dtoMapper::mapToDto)
                .collect(Collectors.toList());
    }

    @GetMapping("/{id}")
    public ProductResponseDto getById(@PathVariable Long id) {
        return dtoMapper.mapToDto(productService.getById(id));
    }

    @DeleteMapping("/{id}")
    public MessageResponseDto delete(@PathVariable Long id) {
        productService.delete(id);
        return messageResponseDtoMapper.mapToDto(MESSAGE);
    }

    @PutMapping("/{id}")
    public ProductResponseDto update(@PathVariable Long id,
                                     @RequestBody ProductRequestDto productRequestDto) {
        Product product = dtoMapper.mapToModel(productRequestDto);
        product.setId(id);
        return dtoMapper.mapToDto(productService.update(product));
    }
}
