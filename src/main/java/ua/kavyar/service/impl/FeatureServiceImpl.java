package ua.kavyar.service.impl;

import java.util.List;
import java.util.Map;
import org.springframework.data.jpa.domain.Specification;
import org.springframework.stereotype.Service;
import ua.kavyar.model.Feature;
import ua.kavyar.repository.FeatureRepository;
import ua.kavyar.repository.specification.SpecificationManager;
import ua.kavyar.service.FeatureService;

@Service
public class FeatureServiceImpl implements FeatureService {
    private final SpecificationManager<Feature> specificationManager;

    private final FeatureRepository featureRepository;

    public FeatureServiceImpl(SpecificationManager<Feature> specificationManager,
                              FeatureRepository featureRepository) {
        this.specificationManager = specificationManager;
        this.featureRepository = featureRepository;
    }

    @Override
    public Feature create(Feature feature) {
        return featureRepository.save(feature);
    }

    @Override
    public List<Feature> findAll(Map<String, String> params) {
        Specification<Feature> specification = null;
        for (Map.Entry<String, String> param : params.entrySet()) {
            Specification<Feature> sp = specificationManager.get(param.getKey(),
                    param.getValue().split(","));
            specification = specification == null
                    ? Specification.where(sp) : specification.and(sp);

        }
        return featureRepository.findAll(specification);
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
