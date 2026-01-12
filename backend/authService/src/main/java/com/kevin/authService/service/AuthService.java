package com.kevin.authService.service;

import com.kevin.authService.model.AuthModels.AuthRequestModel;
import com.kevin.authService.model.AuthModels.AuthResponseModel;
import lombok.RequiredArgsConstructor;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class AuthService {

    private final AuthenticationManager authenticationManager;

    public AuthResponseModel authenticate(AuthRequestModel request){
        if(request!=null){
            authenticationManager.authenticate(new UsernamePasswordAuthenticationToken(
                    request.getEmailId(),request.getPassword()
            ));

        }
        return null;
    }
}
