package ua.kavyar.security;


import ua.kavyar.model.User;

public interface AuthenticationService {

    User login(String login, String password);
}
