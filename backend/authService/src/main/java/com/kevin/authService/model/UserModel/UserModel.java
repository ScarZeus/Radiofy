package com.kevin.authService.model.UserModel;


import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@NoArgsConstructor
@AllArgsConstructor
@Getter
@Setter
public class UserModel {

    private long id;
    private String userName;
    private String password;
    private String emailId;
    private String phoneNo;


}
