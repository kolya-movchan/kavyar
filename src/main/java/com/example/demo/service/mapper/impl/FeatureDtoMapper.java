package com.example.demo.service.mapper.impl;

import com.example.demo.dto.FeatureRequestDto;
import com.example.demo.dto.FeatureResponseDto;
import com.example.demo.model.Feature;
import com.example.demo.service.mapper.DtoMapper;
import org.springframework.stereotype.Service;

@Service
public class FeatureDtoMapper implements
        DtoMapper<Feature, FeatureRequestDto, FeatureResponseDto> {
    @Override
    public FeatureResponseDto mapToDto(Feature feature) {
        FeatureResponseDto featureResponseDto = new FeatureResponseDto();
        featureResponseDto.setId(feature.getId());
        featureResponseDto.setName(feature.getName());
        featureResponseDto.setDescription(feature.getDescription());
        return featureResponseDto;
    }

    @Override
    public Feature mapToModel(FeatureRequestDto featureRequestDto) {
        Feature feature = new Feature();
        feature.setName(featureRequestDto.getName());
        feature.setDescription(featureRequestDto.getDescription());
        return feature;
    }
}
