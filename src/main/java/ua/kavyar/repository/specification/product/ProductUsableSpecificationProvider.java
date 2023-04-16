package ua.kavyar.repository.specification.product;

import jakarta.persistence.criteria.Predicate;
import jakarta.persistence.criteria.Root;
import jakarta.persistence.criteria.Subquery;
import java.util.ArrayList;
import java.util.List;
import org.springframework.data.jpa.domain.Specification;
import org.springframework.stereotype.Component;
import ua.kavyar.model.Product;
import ua.kavyar.model.ProductPrice;
import ua.kavyar.repository.specification.SpecificationProvider;

@Component
public class ProductUsableSpecificationProvider implements SpecificationProvider<Product> {

    private static final String FIELD_NAME = "product";
    private static final String FILTER_KEY = "usable";

    @Override
    public Specification<Product> getSpecification(String[] params) {
        return (root, query, cb) -> {
            List<Predicate> predicates = new ArrayList<>();
            Subquery<Long> subquery = query.subquery(Long.class);
            Root<ProductPrice> subqueryRoot = subquery.from(ProductPrice.class);
            subquery.select(subqueryRoot.get(FIELD_NAME).get("id")).distinct(true);
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
