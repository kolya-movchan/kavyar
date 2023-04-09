package ua.kavyar.repository.specification.coffeeshop;

import jakarta.persistence.criteria.CriteriaBuilder;
import org.springframework.data.jpa.domain.Specification;
import org.springframework.stereotype.Component;
import ua.kavyar.model.CoffeeShop;
import ua.kavyar.repository.specification.SpecificationProvider;

@Component
public class CoffeeShopStatusFilterSpecificationProvider
        implements SpecificationProvider<CoffeeShop> {
    private static final String FILTER_KEY = "isActive";
    private static final String FIELD_NAME = "isDisable";

    @Override
    public Specification<CoffeeShop> getSpecification(String[] statusBooleans) {
        return (root, query, cb) -> {
            CriteriaBuilder.In<Boolean> predicate = cb.in(root.get(FIELD_NAME));
            for (String statusBoolean : statusBooleans) {
                predicate.value(!Boolean.parseBoolean(statusBoolean));
            }
            return cb.and(predicate);
        };

    }

    @Override
    public String getFilterKey() {
        return FILTER_KEY;
    }
}
