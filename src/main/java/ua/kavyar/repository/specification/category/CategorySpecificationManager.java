package ua.kavyar.repository.specification.category;

import java.util.List;
import java.util.Map;
import java.util.function.Function;
import java.util.stream.Collectors;
import org.springframework.data.jpa.domain.Specification;
import org.springframework.stereotype.Component;
import ua.kavyar.model.Category;
import ua.kavyar.repository.specification.SpecificationManager;
import ua.kavyar.repository.specification.SpecificationProvider;

@Component
public class CategorySpecificationManager implements SpecificationManager<Category> {
    private final Map<String, SpecificationProvider<Category>> providerMap;

    public CategorySpecificationManager(
            List<SpecificationProvider<Category>> productSpecifications) {
        this.providerMap = productSpecifications.stream()
                .collect(Collectors.toMap(SpecificationProvider::getFilterKey,
                        Function.identity()));
    }

    @Override
    public Specification<Category> get(String filterKey, String[] params) {
        if (!providerMap.containsKey(filterKey)) {
            throw new RuntimeException("Key " + filterKey + " is not supported for data filtering");
        }
        return providerMap.get(filterKey).getSpecification(params);
    }
}
