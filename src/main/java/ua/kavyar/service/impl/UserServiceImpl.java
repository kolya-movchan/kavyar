package ua.kavyar.service.impl;

import java.util.List;
import java.util.Optional;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;
import ua.kavyar.model.User;
import ua.kavyar.service.UserService;

@Service
public class UserServiceImpl implements UserService {

    @Value("${admin.login}")
    private String login;
    @Value("${admin.password}")
    private String password;
    @Value("${admin.role}")
    private List<String> roles;

    @Override
    public Optional<User> findByEmail(String email) {
        return Optional.of(new User(login, password, roles));
    }
}
