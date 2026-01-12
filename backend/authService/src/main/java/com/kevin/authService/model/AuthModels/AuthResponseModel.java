package com.kevin.authService.model.AuthModels;

import lombok.Builder;
import lombok.Getter;
import lombok.Setter;
import org.springframework.stereotype.Component;

@Component
@Getter
@Setter
@Builder
public class AuthResponseModel {
    private String jwttoken;
    private String status;
}
