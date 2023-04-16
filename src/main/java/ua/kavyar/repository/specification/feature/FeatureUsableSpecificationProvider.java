package ua.kavyar.repository.specification.feature;

import jakarta.persistence.criteria.Join;
import jakarta.persistence.criteria.Predicate;
import jakarta.persistence.criteria.Root;
import jakarta.persistence.criteria.Subquery;
import java.util.ArrayList;
import java.util.List;
import org.springframework.data.jpa.domain.Specification;
import org.springframework.stereotype.Component;
import ua.kavyar.model.CoffeeShop;
import ua.kavyar.model.Feature;
import ua.kavyar.repository.specification.SpecificationProvider;

@Component
public class FeatureUsableSpecificationProvider implements SpecificationProvider<Feature> {

    private static final String FIELD_NAME = "features";
    private static final String FILTER_KEY = "usable";

    @Override
    public Specification<Feature> getSpecification(String[] params) {
        return (root, query, cb) -> {
            List<Predicate> predicates = new ArrayList<>();
            Subquery<Long> subquery = query.subquery(Long.class);
            Root<CoffeeShop> subqueryRoot = subquery.from(CoffeeShop.class);
            Join<CoffeeShop, Feature> cityJoin = subqueryRoot.join(FIELD_NAME);
            subquery.select(cityJoin.get("id")).distinct(true);
            subquery.where(cb.equal(subqueryRoot.get("isDisable"), false));
            for (String param : params) {
                if (Boolean.parseBoolean(param)) {
                    predicates.add(cb.in(root.get("id")).value(subquery));
                } else {
                    predicates.add(cb.in(root.get("id")).value(subquery).not());
                }
            }
            return cb.or(predicates.toArray(new Predicate[0]));
        };
    }

    @Override
    public String getFilterKey() {
        return FILTER_KEY;
    }
}
