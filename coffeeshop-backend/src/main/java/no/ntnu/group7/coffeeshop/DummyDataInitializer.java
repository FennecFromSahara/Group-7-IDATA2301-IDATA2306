package no.ntnu.group7.coffeeshop;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.context.event.ApplicationReadyEvent;
import org.springframework.context.ApplicationListener;
import org.springframework.stereotype.Component;

import no.ntnu.group7.coffeeshop.model.Category;
import no.ntnu.group7.coffeeshop.model.Product;
import no.ntnu.group7.coffeeshop.model.Role;
import no.ntnu.group7.coffeeshop.model.User;
import no.ntnu.group7.coffeeshop.repositories.CategoryRepository;
import no.ntnu.group7.coffeeshop.repositories.ProductRepository;
import no.ntnu.group7.coffeeshop.repositories.RoleRepository;
import no.ntnu.group7.coffeeshop.repositories.UserRepository;

import java.math.BigDecimal;
import java.util.Arrays;
import java.util.LinkedHashSet;
import java.util.List;
import java.util.Set;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

/**
 * A class which inserts some dummy data into the database, when Spring Boot app
 * has started.
 */
@Component
public class DummyDataInitializer implements ApplicationListener<ApplicationReadyEvent> {
    @Autowired
    private UserRepository userRepository;

    @Autowired
    private RoleRepository roleRepository;

    @Autowired
    private ProductRepository productRepository;

    @Autowired
    private CategoryRepository categoryRepository;

    private final Logger logger = LoggerFactory.getLogger("DummyInit");

    /**
     * This method is called when the application is loaded
     *
     * @param event Event which we don't use :)
     */
    @Override
    public void onApplicationEvent(ApplicationReadyEvent event) {
        if (userRepository.count() == 0) {
            logger.info("Importing test users...");

            /* The passwords are hashed using bcrypt */
            User testUser = new User("testUser",
                    "$2a$12$AIbp1s0f5REEJ1Ck7jNlGOcfiApTge164eT9mCxREtjHoNbnv6B2u", "FirstName",
                    "LastName", "email@email.com", "Test station");

            User adminUser = new User("admin",
                    "$2a$12$j7zoEDLcKGeNfF/V8eVVVuDV6gYJBsSVmREZfyUN7jErSQV.Ic1Ba", "Admin",
                    "King", "admin@mail.com", "Heaven");

            Role userRole = new Role("ROLE_USER");
            Role adminRole = new Role("ROLE_ADMIN");

            testUser.addRole(userRole);

            adminUser.addRole(userRole);
            adminUser.addRole(adminRole);

            roleRepository.save(userRole);
            roleRepository.save(adminRole);

            userRepository.save(testUser);
            userRepository.save(adminUser);

            logger.info("DONE importing test products");
        } else {
            logger.info("Users already in the database, not importing anything");
        }

        if (productRepository.count() == 0) {
            logger.info("Importing test products...");

            Product brazilianCoffee = new Product("Brazilian coffee", new BigDecimal(80),
                    "This delicious Brazilian coffee is sealed for freshness, giving you the ultimate coffee-drinking experience. 500 grams of this robust and flavorful blend will bring you the perfect cup every time. With a full-bodied taste and subtle notes of chocolate, this coffee is sure to become your favorite. Enjoy the unique Brazilian flavor in every sip!",
                    "", 15);
            Product greenTea = new Product("Green tea", new BigDecimal(50),
                    "This 200-gram pack of green tea is the perfect refresher. Known for its antioxidants and relaxing qualities, our green tea is a healthy and delicious choice.",
                    "", 10);
            Product peruCoffeeBeans = new Product("Peru coffee beans", new BigDecimal(120),
                    "This 500-gram bag of premium coffee beans from Peru is the perfect way to start your day. Grown in the highlands of Peru, the beans are carefully harvested and sealed for maximum freshness. This medium roast coffee is known for its full-bodied flavor and sweet, nutty aroma. Enjoy the smooth, creamy flavor that a cup of coffee from Peru can provide. Perfect for any coffee lover, these beans will help you create the perfect cup of coffee every morning.",
                    "", 1);
            Product blackTea = new Product("Black tea", new BigDecimal(60),
                    "Our 200-gram pack of black tea provides a classic, robust flavor. Perfect for a morning wake-up or an afternoon pick-me-up, enjoy the robust, full-bodied taste of our black tea.",
                    "", 20);
            Product earlGreyTea = new Product("Earl Grey tea", new BigDecimal(70),
                    "This 200-gram pack of Earl Grey tea is a fragrant delight. The refreshing citrus notes and the calming properties of bergamot make our Earl Grey a tea lover's favorite.",
                    "", 5);
            Product chamomileTea = new Product("Chamomile tea", new BigDecimal(40),
                    "Our 200-gram pack of chamomile tea is the perfect companion for relaxation. Known for its calming properties, chamomile tea is a great choice for a stress-free evening.",
                    "", 15);
            Product arabicaCoffee = new Product("Arabica coffee", new BigDecimal(100),
                    "Our 500-gram pack of ground Arabica coffee offers a smooth and slightly sweet flavor. Enjoy the rich, full-bodied taste of our 100% Arabica coffee.",
                    "", 10);
            Product colombiaCoffeeBeans = new Product("Colombia coffee beans", new BigDecimal(110),
                    "Our 500-gram pack of Colombia coffee beans provide a full-bodied, rich flavor with a slight hint of nuttiness. Enjoy the robust flavors of our carefully sourced Colombia coffee beans.",
                    "", 5);
            Product whiteTea = new Product("White tea", new BigDecimal(80),
                    "This 200-gram pack of white tea offers a delicate and sweet flavor. Enjoy the subtle, slightly sweet taste of our carefully harvested white tea leaves.",
                    "", 15);
            Product oolongTea = new Product("Oolong tea", new BigDecimal(90),
                    "Our 200-gram pack of Oolong tea provides a unique flavor that's both robust and delicate. Enjoy the complex, layered flavors of our Oolong tea, perfect for tea connoisseurs.",
                    "", 10);

            // Other
            Product chocolate = new Product("Chocolate", new BigDecimal(150),
                    "Indulge in the ultimate decadence with our delicious 500g 70% cocoa chocolate. Carefully crafted from the finest ingredients, this chocolate is sure to satisfy your sweet tooth. With a grid that makes it easy to break into smaller pieces, it's perfect for baking or for eating straight. Enjoy the smooth, refreshing flavor of this high-quality chocolate and indulge in a treat that is truly unforgettable.",
                    "", 40);
            Product pancakes = new Product("Pancakes", new BigDecimal(79),
                    "These fluffy and tasty pancakes are the perfect addition to any breakfast. They are light and airy yet still full of flavor. Enjoy them on their own or with your favorite syrup. They also pair perfectly with a hot cup of coffee. Please note that any berries shown in the picture are not included and must be purchased separately.",
                    "", 40);
            Product coffeeMachine = new Product("Coffee machine", new BigDecimal(4600),
                    "Introducing the ultimate coffee machine! This sleek and practical black machine is perfect for all your coffee making needs. This machine can do it all from making a delicious cup of coffee to creating velvety foam for cappuccinos and lattes. With easy-to-clean parts, you can be sure your machine is always spotless and ready to use. Enjoy the perfect cup of coffee every time with this one-of-a-kind machine.",
                    "", 10);

            if (categoryRepository.count() == 0) {
                logger.info("Importing test categories...");

                Category coffeeCategory = new Category("coffee");
                Category groundCategory = new Category("ground");
                Category teaCategory = new Category("tea");
                Category greenTeaCategory = new Category("green");
                Category blackTeaCategory = new Category("black");
                Category herbalTeaCategory = new Category("herbal");
                Category beansCategory = new Category("beans");
                Category sweetsCategory = new Category("sweets");
                Category otherCategory = new Category("other");
                Category bakedCategory = new Category("baked");
                Category gadgetsCategory = new Category("gadgets");
                Category accessoriesCategory = new Category("accessories");

                List<Category> categories = Arrays.asList(coffeeCategory, groundCategory, teaCategory, greenTeaCategory,
                        blackTeaCategory, herbalTeaCategory, beansCategory, sweetsCategory, otherCategory,
                        bakedCategory,
                        gadgetsCategory, accessoriesCategory);
                categoryRepository.saveAll(categories);

                logger.info("DONE importing test categories");

                logger.info("applying test categories...");
                brazilianCoffee.setCategories(Arrays.asList(coffeeCategory, groundCategory));
                greenTea.setCategories(Arrays.asList(teaCategory, greenTeaCategory));
                peruCoffeeBeans.setCategories(Arrays.asList(coffeeCategory, beansCategory));
                blackTea.setCategories(Arrays.asList(teaCategory, blackTeaCategory));
                earlGreyTea.setCategories(Arrays.asList(teaCategory, blackTeaCategory));
                chamomileTea.setCategories(Arrays.asList(teaCategory, herbalTeaCategory));
                arabicaCoffee.setCategories(Arrays.asList(coffeeCategory, groundCategory));
                colombiaCoffeeBeans.setCategories(Arrays.asList(coffeeCategory, beansCategory));
                whiteTea.setCategories(Arrays.asList(teaCategory, otherCategory));
                oolongTea.setCategories(Arrays.asList(teaCategory, otherCategory));

                chocolate.setCategories(Arrays.asList(sweetsCategory, otherCategory));
                pancakes.setCategories(Arrays.asList(sweetsCategory, bakedCategory, otherCategory));
                coffeeMachine.setCategories(
                        Arrays.asList(accessoriesCategory, gadgetsCategory, coffeeCategory, otherCategory));
                logger.info("DONE applying test categories");
            } else {
                logger.info("Categories already in the database, not importing anything");
            }

            productRepository.saveAll(Arrays.asList(
                    brazilianCoffee,
                    greenTea,
                    peruCoffeeBeans,
                    blackTea,
                    earlGreyTea,
                    chamomileTea,
                    arabicaCoffee,
                    colombiaCoffeeBeans,
                    whiteTea,
                    oolongTea,
                    chocolate,
                    pancakes,
                    coffeeMachine));

            logger.info("DONE importing test products");
        } else {
            logger.info("Products already in the database, not importing anything");
        }
    }
}
