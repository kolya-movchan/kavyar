package com.example.demo.service;

import com.example.demo.model.Feature;
import java.util.List;

public interface FeatureService {
    Feature create(Feature feature);

    List<Feature> findAll();

    Feature getById(Long id);

    void delete(Long id);

    Feature update(Feature feature);
}
