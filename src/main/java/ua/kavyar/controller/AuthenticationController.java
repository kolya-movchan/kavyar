package ua.kavyar.controller;

import java.util.Map;
import jakarta.validation.Valid;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;
import ua.kavyar.dto.UserLoginDto;
import ua.kavyar.model.User;
import ua.kavyar.security.AuthenticationService;
import ua.kavyar.security.jwt.JwtTokenProvider;

@RestController
public class AuthenticationController {
    private final AuthenticationService authenticationService;
    private final JwtTokenProvider jwtTokenProvider;

    public AuthenticationController(AuthenticationService authenticationService,
                                    JwtTokenProvider jwtTokenProvider) {
        this.authenticationService = authenticationService;
        this.jwtTokenProvider = jwtTokenProvider;
    }

    @PostMapping("/login")
    public ResponseEntity<Object> login(@RequestBody @Valid UserLoginDto userLoginDto) {
        User user = authenticationService
                .login(userLoginDto.getLogin(), userLoginDto.getPassword());
        String token = jwtTokenProvider
                .createToken(user.getLogin(), user.getRoles());
        return new ResponseEntity<>(Map.of("token", token), HttpStatus.OK);
    }

}
