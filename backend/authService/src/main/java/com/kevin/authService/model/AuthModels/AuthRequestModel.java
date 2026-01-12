package com.kevin.authService.model.AuthModels;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.Setter;
import org.springframework.stereotype.Component;

@Component
@AllArgsConstructor
@Builder
@Getter
@Setter
public class AuthRequestModel {

    private String emailId;
    private String password;

}
