package ua.kavyar.service;

import java.util.Optional;
import ua.kavyar.model.User;

public interface UserService {
    Optional<User> findByEmail(String email);
}
