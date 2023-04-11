package ua.kavyar.service.impl;

import java.util.List;
import java.util.Map;
import org.springframework.data.jpa.domain.Specification;
import org.springframework.stereotype.Service;
import ua.kavyar.model.Product;
import ua.kavyar.repository.ProductRepository;
import ua.kavyar.repository.specification.SpecificationManager;
import ua.kavyar.service.ProductService;

@Service
public class ProductServiceImpl implements ProductService {
    private final SpecificationManager<Product> specificationManager;
    private final ProductRepository productRepository;

    public ProductServiceImpl(SpecificationManager<Product> specificationManager,
                              ProductRepository productRepository) {
        this.specificationManager = specificationManager;
        this.productRepository = productRepository;
    }

    @Override
    public Product create(Product product) {
        return productRepository.save(product);
    }

    @Override
    public List<Product> findAll(Map<String, String> params) {
        Specification<Product> specification = null;
        for (Map.Entry<String, String> param : params.entrySet()) {
            Specification<Product> sp = specificationManager.get(param.getKey(),
                    param.getValue().split(","));
            specification = specification == null
                    ? Specification.where(sp) : specification.and(sp);
        }
        return productRepository.findAll(specification);
    }

    @Override
    public Product getById(Long id) {
        return productRepository.getReferenceById(id);
    }

    @Override
    public void delete(Long id) {
        productRepository.deleteById(id);
    }

    @Override
    public Product update(Product product) {
        return productRepository.save(product);
    }
}
