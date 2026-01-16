package com.kevin.authService.model.AuthModels;


import lombok.AllArgsConstructor;
import lombok.Builder;

import lombok.Getter;
import lombok.Setter;


@Builder
@Getter
@Setter
@AllArgsConstructor
public class AuthRequestModel {

    private String emailId;
    private String password;

}
