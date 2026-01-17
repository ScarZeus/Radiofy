package com.kevin.authService.model.AuthModels;


import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.Setter;
import lombok.NoArgsConstructor;


@Builder
@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
public class AuthRequestModel {

    private String emailId;
    private String password;

}

