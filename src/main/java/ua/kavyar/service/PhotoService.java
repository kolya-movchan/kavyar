package ua.kavyar.service;

import ua.kavyar.model.Photo;
import java.util.List;

public interface PhotoService {
    Photo create(Photo photo);

    List<Photo> findAll();

    Photo getById(Long id);

    void delete(Long id);

    Photo update(Photo photo);
}
