package ua.kavyar.controller;

import io.swagger.v3.oas.annotations.Hidden;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import ua.kavyar.model.Category;
import ua.kavyar.model.City;
import ua.kavyar.model.Feature;
import ua.kavyar.model.Product;
import ua.kavyar.service.CategoryService;
import ua.kavyar.service.CityService;
import ua.kavyar.service.FeatureService;
import ua.kavyar.service.ProductService;

@Hidden
@RestController
@RequestMapping("/inject")
public class InjectController {

    private final CityService cityService;
    private final CategoryService categoryService;
    private final FeatureService featureService;
    private final ProductService productService;

    public InjectController(CityService cityService, CategoryService categoryService,
                            FeatureService featureService, ProductService productService) {
        this.cityService = cityService;
        this.categoryService = categoryService;
        this.featureService = featureService;
        this.productService = productService;
    }

    @GetMapping
    public String inject() {
        injectCity();
        injectCategoryAndProduct();
        injectFeature();
        return "Done!";
    }

    private void injectFeature() {
        Feature bombShelter = new Feature();
        bombShelter.setName("Бомбосховище");
        bombShelter.setDescription("Бомбосховище");
        featureService.create(bombShelter);
        Feature homePets = new Feature();
        homePets.setName("Можна з тваринками");
        homePets.setDescription("Можна з тваринками");
        featureService.create(homePets);
        Feature gasGenerator = new Feature();
        gasGenerator.setName("Генератор");
        gasGenerator.setDescription("Генератор");
        featureService.create(gasGenerator);
    }

    private void injectCategoryAndProduct() {
        Category coffee = new Category();
        coffee.setName("Кава");
        categoryService.create(coffee);

        Category coffeeToGo = new Category();
        coffeeToGo.setName("Кава з собою");
        categoryService.create(coffeeToGo);

        Category coffeeBeans = new Category();
        coffeeBeans.setName("Кава у зернах");
        categoryService.create(coffeeBeans);

        Category dessert = new Category();
        dessert.setName("Десерти");
        categoryService.create(dessert);

        Product espresso = new Product();
        espresso.setName("Еспресо");
        espresso.setDescription("Еспресо");
        espresso.setCategory(coffee);
        productService.create(espresso);

        Product americano = new Product();
        americano.setName("Амерікано");
        americano.setDescription("Амерікано");
        americano.setCategory(coffee);
        productService.create(americano);

        Product cappuccino = new Product();
        cappuccino.setName("Капучіно");
        cappuccino.setDescription("Капучіно");
        cappuccino.setCategory(coffee);
        productService.create(cappuccino);

        Product brownie = new Product();
        brownie.setName("Брауні з дор-блю");
        brownie.setDescription("Брауні з дор-блю");
        brownie.setCategory(dessert);
        productService.create(brownie);

        Product cheesecake = new Product();
        cheesecake.setName("Чіз-кейк з солоною карамеллю");
        cheesecake.setDescription("Чіз-кейк з солоною карамеллю");
        cheesecake.setCategory(dessert);
        productService.create(cheesecake);
    }

    private void injectCity() {
        City kharkiv = new City();
        kharkiv.setName("Харків");
        cityService.create(kharkiv);
        City kyiv = new City();
        kyiv.setName("Київ");
        cityService.create(kyiv);
        City uzhgorod = new City();
        uzhgorod.setName("Ужгород");
        cityService.create(uzhgorod);
    }
}
