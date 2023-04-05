package ua.kavyar.service;

import ua.kavyar.model.Category;
import java.util.List;

public interface CategoryService {
    Category create(Category city);

    List<Category> findAll();

    Category getById(Long id);

    void delete(Long id);

    Category update(Category category);
}
