package com.example.demo.service.mapper.impl;

import com.example.demo.dto.auxiliary.PhotoRequestDto;
import com.example.demo.dto.auxiliary.PhotoResponseDto;
import com.example.demo.model.Photo;
import com.example.demo.service.mapper.DtoMapper;
import org.springframework.stereotype.Service;

@Service
public class PhotoDtoMapper implements DtoMapper<Photo, PhotoRequestDto, PhotoResponseDto> {
    @Override
    public PhotoResponseDto mapToDto(Photo photo) {
        PhotoResponseDto photoResponseDto = new PhotoResponseDto();
        photoResponseDto.setId(photo.getId());
        photoResponseDto.setUrl(photo.getUrl());
        return photoResponseDto;
    }

    @Override
    public Photo mapToModel(PhotoRequestDto photoRequestDto) {
        Photo photo = new Photo();
        photo.setUrl(photoRequestDto.getUrl());
        return photo;
    }
}
