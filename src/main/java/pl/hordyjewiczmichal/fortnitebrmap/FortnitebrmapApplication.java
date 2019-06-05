package pl.hordyjewiczmichal.fortnitebrmap;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.context.annotation.Bean;
import org.springframework.http.CacheControl;
import org.springframework.web.servlet.config.annotation.CorsRegistry;
import org.springframework.web.servlet.config.annotation.ResourceHandlerRegistry;
import org.springframework.web.servlet.config.annotation.WebMvcConfigurer;

import java.util.concurrent.TimeUnit;

@SpringBootApplication
public class FortnitebrmapApplication
{
    @Bean
    public WebMvcConfigurer webMvcConfigurer()
    {
        return new WebMvcConfigurer()
        {
            @Override
            public void addCorsMappings(CorsRegistry registry)
            {
                registry.addMapping("/api/**")
                        .allowedMethods("GET", "POST", "PUT", "DELETE");
                //.allowedOrigins("http://localhost:8080");
            }

            @Override
            public void addResourceHandlers(ResourceHandlerRegistry registry)
            {
                registry.addResourceHandler("/images/**")
                        .addResourceLocations("/images/")
                        .setCacheControl(CacheControl.maxAge(180, TimeUnit.DAYS));
            }
        };
    }


    public static void main(String[] args)
    {
        SpringApplication.run(FortnitebrmapApplication.class, args);
    }
}
