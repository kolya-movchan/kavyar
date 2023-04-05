package ua.kavyar.service;

import ua.kavyar.model.City;
import java.util.List;

public interface CityService {
    City create(City city);

    List<City> findAll();

    City getById(Long id);

    void delete(Long id);

    City update(City city);
}
