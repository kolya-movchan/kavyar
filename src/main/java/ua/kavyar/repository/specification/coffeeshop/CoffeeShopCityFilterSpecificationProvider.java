package ua.kavyar.repository.specification.coffeeshop;

import jakarta.persistence.criteria.CriteriaBuilder;
import jakarta.persistence.criteria.Join;
import jakarta.persistence.criteria.JoinType;
import org.springframework.data.jpa.domain.Specification;
import org.springframework.stereotype.Component;
import ua.kavyar.model.City;
import ua.kavyar.model.CoffeeShop;
import ua.kavyar.repository.specification.SpecificationProvider;

@Component
public class CoffeeShopCityFilterSpecificationProvider
        implements SpecificationProvider<CoffeeShop> {
    private static final String FILTER_KEY = "city";
    private static final String FIELD_NAME = "city";

    @Override
    public Specification<CoffeeShop> getSpecification(String[] cityIds) {
        return (root, query, cb) -> {
            Join<CoffeeShop, City> featuresJoin = root.join(FIELD_NAME, JoinType.LEFT);
            CriteriaBuilder.In<Long> predicate = cb.in(featuresJoin.get("id"));
            for (String cityId : cityIds) {
                predicate.value(Long.valueOf(cityId));
            }
            return cb.and(predicate);
        };
    }

    @Override
    public String getFilterKey() {
        return FILTER_KEY;
    }
}
