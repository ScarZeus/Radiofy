package com.kevin.authService.controller;


import com.kevin.authService.model.AuthModels.AuthRequestModel;
import com.kevin.authService.model.AuthModels.AuthResponseModel;
import com.kevin.authService.service.AuthService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequiredArgsConstructor
public class AuthController {

    private  AuthService authService;


    @GetMapping("/login")
    private ResponseEntity<AuthResponseModel> login(@RequestParam("email") String email, @RequestParam("password") String password){
        AuthResponseModel response = authService.authenticate(new AuthRequestModel(email,password));
        return null;

    }
}
