package ua.kavyar.repository.specification.coffeeshop;

import jakarta.persistence.criteria.Path;
import jakarta.persistence.criteria.Predicate;
import java.util.ArrayList;
import java.util.Arrays;
import java.util.List;
import org.springframework.data.jpa.domain.Specification;
import org.springframework.stereotype.Component;
import ua.kavyar.model.CoffeeShop;
import ua.kavyar.repository.specification.SpecificationProvider;

@Component
public class CoffeeShopTitleSearchSpecificationProvider
        implements SpecificationProvider<CoffeeShop> {

    private static final String FILTER_KEY = "searchInTitle";
    private static final String FIELD_NAME = "title";

    @Override
    public Specification<CoffeeShop> getSpecification(String[] params) {
        return (root, query, cb) -> {
            List<Predicate> predicates = new ArrayList<>();
            Path<String> titlePath = root.get(FIELD_NAME);
            Arrays.stream(params).forEach(p -> {
                String[] paramVariants = new String[]{
                        p,
                        String.valueOf(p.charAt(0)).toUpperCase() + p.substring(1).toLowerCase(),
                        p.toUpperCase(),
                        p.toLowerCase()
                };
                for (String paramVariant : paramVariants) {
                    predicates.add(cb.like(titlePath, "%" + paramVariant + "%"));
                }
            });
            return cb.or(predicates.toArray(new Predicate[0]));
        };
    }

    @Override
    public String getFilterKey() {
        return FILTER_KEY;
    }
}
