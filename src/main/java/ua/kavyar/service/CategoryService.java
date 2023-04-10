package ua.kavyar.service;

import java.util.List;
import java.util.Map;
import ua.kavyar.model.Category;

public interface CategoryService {
    Category create(Category city);

    List<Category> findAll(Map<String, String> params);

    Category getById(Long id);

    void delete(Long id);

    Category update(Category category);
}
