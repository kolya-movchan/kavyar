package ua.kavyar.repository.specification.city;

import java.util.List;
import java.util.Map;
import java.util.function.Function;
import java.util.stream.Collectors;
import org.springframework.data.jpa.domain.Specification;
import org.springframework.stereotype.Component;
import ua.kavyar.model.City;
import ua.kavyar.repository.specification.SpecificationManager;
import ua.kavyar.repository.specification.SpecificationProvider;

@Component
public class CitySpecificationManager implements SpecificationManager<City> {
    private final Map<String, SpecificationProvider<City>> providerMap;

    public CitySpecificationManager(List<SpecificationProvider<City>> productSpecifications) {
        this.providerMap = productSpecifications.stream()
                .collect(Collectors.toMap(SpecificationProvider::getFilterKey,
                        Function.identity()));
    }

    @Override
    public Specification<City> get(String filterKey, String[] params) {
        if (!providerMap.containsKey(filterKey)) {
            throw new RuntimeException("Key " + filterKey + " is not supported for data filtering");
        }
        return providerMap.get(filterKey).getSpecification(params);
    }
}
