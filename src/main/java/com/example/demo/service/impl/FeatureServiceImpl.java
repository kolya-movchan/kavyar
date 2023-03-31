package com.example.demo.service.impl;

import com.example.demo.model.Feature;
import com.example.demo.repository.FeatureRepository;
import com.example.demo.service.FeatureService;
import java.util.List;
import org.springframework.stereotype.Service;

@Service
public class FeatureServiceImpl implements FeatureService {
    private final FeatureRepository featureRepository;

    public FeatureServiceImpl(FeatureRepository featureRepository) {
        this.featureRepository = featureRepository;
    }

    @Override
    public Feature create(Feature feature) {
        return featureRepository.save(feature);
    }

    @Override
    public List<Feature> findAll() {
        return featureRepository.findAll();
    }

    @Override
    public Feature getById(Long id) {
        return featureRepository.getReferenceById(id);
    }

    @Override
    public void delete(Long id) {
        featureRepository.deleteById(id);
    }

    @Override
    public Feature update(Feature feature) {
        return featureRepository.save(feature);
    }
}
