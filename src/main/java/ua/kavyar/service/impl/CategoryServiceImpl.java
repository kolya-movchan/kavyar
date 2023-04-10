package ua.kavyar.service.impl;

import java.util.List;
import java.util.Map;
import org.springframework.data.jpa.domain.Specification;
import org.springframework.stereotype.Service;
import ua.kavyar.model.Category;
import ua.kavyar.repository.CategoryRepository;
import ua.kavyar.repository.specification.SpecificationManager;
import ua.kavyar.service.CategoryService;

@Service
public class CategoryServiceImpl implements CategoryService {
    private final SpecificationManager<Category> specificationManager;

    private final CategoryRepository categoryRepository;

    public CategoryServiceImpl(SpecificationManager<Category> specificationManager,
                               CategoryRepository categoryRepository) {
        this.specificationManager = specificationManager;
        this.categoryRepository = categoryRepository;
    }

    @Override
    public Category create(Category city) {
        return categoryRepository.save(city);
    }

    @Override
    public List<Category> findAll(Map<String, String> params) {
        Specification<Category> specification = null;
        for (Map.Entry<String, String> param : params.entrySet()) {
            Specification<Category> sp = specificationManager.get(param.getKey(),
                    param.getValue().split(","));
            specification = specification == null
                    ? Specification.where(sp) : specification.and(sp);

        }
        return categoryRepository.findAll(specification);
    }

    @Override
    public Category getById(Long id) {
        return categoryRepository.getReferenceById(id);
    }

    @Override
    public void delete(Long id) {
        categoryRepository.deleteById(id);
    }

    @Override
    public Category update(Category category) {
        return categoryRepository.save(category);
    }
}
