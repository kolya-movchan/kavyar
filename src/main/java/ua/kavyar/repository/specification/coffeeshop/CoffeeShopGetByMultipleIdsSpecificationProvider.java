package ua.kavyar.repository.specification.coffeeshop;

import jakarta.persistence.criteria.CriteriaBuilder;
import org.springframework.data.jpa.domain.Specification;
import org.springframework.stereotype.Component;
import ua.kavyar.model.CoffeeShop;
import ua.kavyar.repository.specification.SpecificationProvider;

@Component
public class CoffeeShopGetByMultipleIdsSpecificationProvider
        implements SpecificationProvider<CoffeeShop> {

    private static final String FILTER_KEY = "ids";
    private static final String FIELD_NAME = "id";

    @Override
    public Specification<CoffeeShop> getSpecification(String[] params) {
        return (root, query, cb) -> {
            CriteriaBuilder.In<Long> predicate = cb.in(root.get(FIELD_NAME));
            for (String param : params) {
                predicate.value(Long.parseLong(param));
            }
            return cb.and(predicate);
        };
    }

    @Override
    public String getFilterKey() {
        return FILTER_KEY;
    }
}
