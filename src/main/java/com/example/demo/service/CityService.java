package com.example.demo.service;

import com.example.demo.model.City;

import java.util.List;

public interface CityService {
    City create(City city);

    List<City> findAll();

    City getById(Long id);

    void delete(Long id);
}
