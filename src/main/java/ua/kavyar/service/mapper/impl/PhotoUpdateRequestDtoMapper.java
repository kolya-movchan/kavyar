package ua.kavyar.service.mapper.impl;

import org.springframework.stereotype.Service;
import ua.kavyar.dto.PhotoUpdateRequestDto;
import ua.kavyar.model.Photo;
import ua.kavyar.service.mapper.RequestDtoMapper;

@Service
public class PhotoUpdateRequestDtoMapper
        implements RequestDtoMapper<Photo, PhotoUpdateRequestDto> {

    @Override
    public Photo mapToModel(PhotoUpdateRequestDto photoUpdateRequestDto) {
        Photo photo = new Photo();
        photo.setId(photoUpdateRequestDto.getId());
        photo.setUrl(photoUpdateRequestDto.getUrl());
        return photo;
    }
}
