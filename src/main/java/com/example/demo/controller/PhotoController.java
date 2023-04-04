package com.example.demo.controller;

import com.example.demo.dto.PhotoRequestDto;
import com.example.demo.dto.PhotoResponseDto;
import com.example.demo.model.Photo;
import com.example.demo.service.PhotoService;
import com.example.demo.service.mapper.DtoMapper;
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

@RestController
@RequestMapping("/photos")
public class PhotoController {
    private final PhotoService photoService;
    private final DtoMapper<Photo, PhotoRequestDto, PhotoResponseDto> dtoMapper;

    public PhotoController(PhotoService photoService,
                           DtoMapper<Photo, PhotoRequestDto, PhotoResponseDto> dtoMapper) {
        this.photoService = photoService;
        this.dtoMapper = dtoMapper;
    }

    @PostMapping
    public PhotoResponseDto add(@RequestBody PhotoRequestDto photoRequestDto) {
        return dtoMapper.mapToDto(photoService.create(dtoMapper.mapToModel(photoRequestDto)));
    }

    @GetMapping
    public List<PhotoResponseDto> getAll() {
        return photoService.findAll().stream()
                .map(dtoMapper::mapToDto)
                .collect(Collectors.toList());
    }

    @GetMapping("/{id}")
    public PhotoResponseDto getById(@PathVariable Long id) {
        return dtoMapper.mapToDto(photoService.getById(id));
    }

    @DeleteMapping("/{id}")
    public void delete(@PathVariable Long id) {
        photoService.delete(id);
    }

    @PutMapping("/{id}")
    public PhotoResponseDto update(@PathVariable Long id,
                                  @RequestBody PhotoRequestDto photoRequestDto) {
        Photo photo = dtoMapper.mapToModel(photoRequestDto);
        photo.setId(id);
        return dtoMapper.mapToDto(photoService.update(photo));
    }
}
