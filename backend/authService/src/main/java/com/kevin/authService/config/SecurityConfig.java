package com.kevin.authService.config;

import com.kevin.authService.Filterer.JwtFilterer;
import lombok.AllArgsConstructor;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.ProviderManager;
import org.springframework.security.authentication.dao.DaoAuthenticationProvider;
import org.springframework.security.config.Customizer;
import org.springframework.security.config.annotation.authentication.configuration.AuthenticationConfiguration;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.config.annotation.web.configurers.AbstractHttpConfigurer;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.security.web.SecurityFilterChain;
import org.springframework.security.web.authentication.UsernamePasswordAuthenticationFilter;


@Configuration
@EnableWebSecurity
@AllArgsConstructor
public class SecurityConfig {

    private  JwtFilterer jwtFilterer;
    private  UserDetailsService userDetailService;


    @Bean
    public
    SecurityFilterChain filterChain(HttpSecurity http) throws Exception {
        http
                .authorizeHttpRequests((authorize) -> authorize
                        .anyRequest().authenticated()
                )
                .addFilterBefore(jwtFilterer, UsernamePasswordAuthenticationFilter.class)
                .formLogin(AbstractHttpConfigurer::disable)
                .httpBasic(Customizer.withDefaults());
        return http.build();
    }

    @Bean
    protected  AuthenticationManager authenticationManager(AuthenticationConfiguration config){
        DaoAuthenticationProvider authenticationProvider = authenticationProvider();
        authenticationProvider.setPasswordEncoder(encoder());
        ProviderManager providerManager  = new ProviderManager(authenticationProvider);
        return providerManager;
    }

    @Bean
    protected PasswordEncoder encoder(){
        return new BCryptPasswordEncoder(12);
    }


    @Bean
    protected DaoAuthenticationProvider authenticationProvider(){
        return new DaoAuthenticationProvider(userDetailService);
    }

}
