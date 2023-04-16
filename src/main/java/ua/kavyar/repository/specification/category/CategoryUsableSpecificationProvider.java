package ua.kavyar.repository.specification.category;

import jakarta.persistence.criteria.Join;
import jakarta.persistence.criteria.Predicate;
import jakarta.persistence.criteria.Root;
import jakarta.persistence.criteria.Subquery;
import java.util.ArrayList;
import java.util.List;
import org.springframework.data.jpa.domain.Specification;
import org.springframework.stereotype.Component;
import ua.kavyar.model.Category;
import ua.kavyar.model.Product;
import ua.kavyar.repository.specification.SpecificationProvider;

@Component
public class CategoryUsableSpecificationProvider implements SpecificationProvider<Category> {

    private static final String FIELD_NAME = "category";
    private static final String FILTER_KEY = "usable";

    @Override
    public Specification<Category> getSpecification(String[] params) {
        return (root, query, cb) -> {
            List<Predicate> predicates = new ArrayList<>();
            Subquery<Long> subquery = query.subquery(Long.class);
            Root<Product> subqueryRoot = subquery.from(Product.class);
            Join<Product, Category> categoryJoin = subqueryRoot.join(FIELD_NAME);
            subquery.select(categoryJoin.get("id")).distinct(true);
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
