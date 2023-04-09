package ua.kavyar;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.context.annotation.Bean;
import org.springframework.web.servlet.config.annotation.CorsRegistry;
import org.springframework.web.servlet.config.annotation.WebMvcConfigurer;

@SpringBootApplication
public class StartKavyarServer {

    public static void main(String[] args) {
        SpringApplication.run(StartKavyarServer.class, args);
    }

    @Bean
    public WebMvcConfigurer corsConfigurer() {
        return new WebMvcConfigurer() {
            @Override
            public void addCorsMappings(CorsRegistry registry) {
                registry.addMapping("/**")
                        .allowedOrigins("https://kavyar.herokuapp.com", "http://localhost:3001")
                        //.allowedOriginPatterns("http://localhost:*", "https://kavyar.herokuapp.com:*")
                        .allowedMethods("GET", "POST", "PUT", "DELETE");
            }
        };
    }

}
