package ua.kavyar.repository;

import ua.kavyar.model.CoffeeShop;
import ua.kavyar.model.ProductPrice;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.JpaSpecificationExecutor;

public interface CoffeeShopRepository
        extends JpaRepository<CoffeeShop, Long>, JpaSpecificationExecutor<CoffeeShop> {
    CoffeeShop getByProductsContains(ProductPrice productPrice);
}
