package pl.hordyjewiczmichal.fortnitebrmap.config;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.core.annotation.Order;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.config.annotation.web.configuration.WebSecurityConfigurerAdapter;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;

//import javax.sql.DataSource;

@Configuration
@EnableWebSecurity
public class MultiHttpSecurityConfig extends WebSecurityConfigurerAdapter
{
//    @Autowired
//    DataSource dataSource;

    @Bean
    public BCryptPasswordEncoder passwordEncoder()
    {
        return new BCryptPasswordEncoder();
    }

//    @Autowired
//    public void configureGlobal(AuthenticationManagerBuilder auth) // spring example
//    {
//        auth
//                .inMemoryAuthentication()
//                .withUser("user").password("password").roles("USER").and()
//                .withUser("admin").password("password").roles("USER", "ADMIN");
//    }

//    @Override
//    public void configure(AuthenticationManagerBuilder auth) throws Exception
//    {
//        auth.jdbcAuthentication()
//                .dataSource(dataSource) // my DB data source
//                .passwordEncoder(passwordEncoder()) // using password encoder while login
//                .usersByUsernameQuery("SELECT email, password, enable FROM admins WHERE email = ?") // pointing to my table (because default is `users`)
//                .authoritiesByUsernameQuery("SELECT email, 'default' FROM admins WHERE email = ?"); // mocking authorities table
//    }

    @Configuration
    @Order(1)
    public static class StaticWebSecurityConfigurationAdapter extends WebSecurityConfigurerAdapter
    {
        @Override
        protected void configure(HttpSecurity http) throws Exception
        {
            // X-Frame-Options config for static/specified sites
            http
                    .antMatcher("/reboot-vans/**")
                    .antMatcher("/fortbytes/**")
                    .headers()
                    .frameOptions()
                    .disable();
            // .addHeaderWriter(new XFrameOptionsHeaderWriter(new StaticAllowFromStrategy(URI.create("https://example.com"))));
        }
    }

    @Configuration
    @Order(2)
    public static class WebSecurityConfigurationAdapter extends WebSecurityConfigurerAdapter
    {
        @Override
        protected void configure(HttpSecurity http) throws Exception
        {
            // X-Frame-Options config for remaining sites
            http
                    .antMatcher("/**")
                    .headers()
                    .frameOptions()
                    .deny();

            //////*** PERMISSIONS CONFIG ***/////
            http.authorizeRequests()
                .antMatchers("/api/**").permitAll()
                .antMatchers("/**").permitAll()
                // .anyRequest().authenticated()

                //.and()
                //.formLogin()
                //.loginPage("/login").permitAll()

                .and()
                .httpBasic()

                .and()
                .csrf().disable(); // disable csrf

       /* http.authorizeRequests()
                .antMatchers("/app/**").authenticated() // require login in this path
                .anyRequest().permitAll() // permit all for the rest of paths

                .and()
                .formLogin()
                .loginPage("/login").permitAll() // login page set to /login and all users are permitted to visit it
                .defaultSuccessUrl("/") // redirect after successful login
                .failureUrl("/login?error") // redirect after unsuccessful login

                .and()
                .logout()
                .logoutRequestMatcher(new AntPathRequestMatcher("/logout")) // path /logout is mapped
                .logoutSuccessUrl("/") // redirect after logout
                .invalidateHttpSession(true) // invalidate session
                .deleteCookies("JSESSIONID") // delete session cookie

                .and()
                .httpBasic();*/
        }
    }
}
