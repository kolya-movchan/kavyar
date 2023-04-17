package ua.kavyar.dto;

import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Setter
@Getter
@NoArgsConstructor
public class UserLoginDto {
    private String login;
    private String password;
}
