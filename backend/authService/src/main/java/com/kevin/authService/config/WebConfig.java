package com.kevin.authService.config;

import com.kevin.authService.interceptor.RequestInterceptor;
import org.springframework.context.annotation.Configuration;
import org.springframework.web.servlet.config.annotation.InterceptorRegistry;
import org.springframework.web.servlet.config.annotation.WebMvcConfigurer;


@Configuration
public class WebConfig implements WebMvcConfigurer {


    public void addInterceptors(InterceptorRegistry registry){
        registry.addInterceptor(new RequestInterceptor()).addPathPatterns("/v1/api/**");
    }
}
