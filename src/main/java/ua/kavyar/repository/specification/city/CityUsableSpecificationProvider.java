package ua.kavyar.repository.specification.city;

import java.util.ArrayList;
import java.util.List;
import jakarta.persistence.criteria.Join;
import jakarta.persistence.criteria.Predicate;
import jakarta.persistence.criteria.Root;
import jakarta.persistence.criteria.Subquery;
import org.springframework.data.jpa.domain.Specification;
import org.springframework.stereotype.Component;
import ua.kavyar.model.City;
import ua.kavyar.model.CoffeeShop;
import ua.kavyar.repository.specification.SpecificationProvider;

@Component
public class CityUsableSpecificationProvider
        implements SpecificationProvider<City> {
    private static final String FIELD_NAME = "city";
    private static final String FILTER_KEY = "usable";

    @Override
    public Specification<City> getSpecification(String[] params) {
        return (root, query, cb) -> {
            List<Predicate> predicates = new ArrayList<>();
            Subquery<Long> subquery = query.subquery(Long.class);
            Root<CoffeeShop> subqueryRoot = subquery.from(CoffeeShop.class);
            Join<CoffeeShop, City> cityJoin = subqueryRoot.join(FIELD_NAME);
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
