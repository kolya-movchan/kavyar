package com.example.demo.service;

import com.example.demo.model.Photo;
import java.util.List;

public interface PhotoService {
    Photo create(Photo photo);

    List<Photo> findAll();

    Photo getById(Long id);

    void delete(Long id);

    Photo update(Photo photo);
}
