package com.example.demo.service;

import com.example.demo.model.Category;
import java.util.List;

public interface CategoryService {
    Category create(Category city);

    List<Category> findAll();

    Category getById(Long id);

    void delete(Long id);

    Category update(Category category);
}
