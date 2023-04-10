package ua.kavyar.service.impl;

import java.util.List;
import java.util.Map;
import org.springframework.data.jpa.domain.Specification;
import org.springframework.stereotype.Service;
import ua.kavyar.model.City;
import ua.kavyar.repository.CityRepository;
import ua.kavyar.repository.specification.SpecificationManager;
import ua.kavyar.service.CityService;

@Service
public class CityServiceImpl implements CityService {

    private final SpecificationManager<City> specificationManager;

    private final CityRepository cityRepository;

    public CityServiceImpl(SpecificationManager<City> specificationManager,
                           CityRepository cityRepository) {
        this.specificationManager = specificationManager;
        this.cityRepository = cityRepository;
    }

    @Override
    public City create(City city) {
        return cityRepository.save(city);
    }

    @Override
    public List<City> findAll(Map<String, String> params) {
        Specification<City> specification = null;
        for (Map.Entry<String, String> param : params.entrySet()) {
            Specification<City> sp = specificationManager.get(param.getKey(),
                    param.getValue().split(","));
            specification = specification == null
                    ? Specification.where(sp) : specification.and(sp);

        }
        return cityRepository.findAll(specification);
    }

    @Override
    public City getById(Long id) {
        return cityRepository.getReferenceById(id);
    }

    @Override
    public void delete(Long id) {
        cityRepository.deleteById(id);
    }

    @Override
    public City update(City city) {
        return cityRepository.save(city);
    }

}
