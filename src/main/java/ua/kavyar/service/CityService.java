package ua.kavyar.service;

import java.util.List;
import java.util.Map;
import ua.kavyar.model.City;

public interface CityService {
    City create(City city);

    List<City> findAll(Map<String, String> params);

    City getById(Long id);

    void delete(Long id);

    City update(City city);
}
