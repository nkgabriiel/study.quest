package br.mobile.studyquest.service;

import br.mobile.studyquest.dto.RegisterDTO;
import br.mobile.studyquest.model.User;
import br.mobile.studyquest.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Service;

@Service
public class AuthService implements UserDetailsService {

    @Autowired
    private UserRepository userRepository;

    @Override
    public UserDetails loadUserByUsername(String username) throws UsernameNotFoundException {
        return userRepository.findByEmail(username);
    }

    public User registerUser(RegisterDTO data) {
        if(userRepository.existsByEmail(data.email())
                || userRepository.existsByUsername(data.username())) {
            throw new IllegalArgumentException("Email ou username já cadastrados.");
        }
        User newUser = new User();
        newUser.setEmail(data.email());
        newUser.setAge(data.age());
        newUser.setFirstName(data.firstName());
        newUser.setLastName(data.lastName());
        newUser.setUsername(data.username());

        String encryptedPassword = new BCryptPasswordEncoder().encode(data.password());
        newUser.setPassword(encryptedPassword);

        return userRepository.save(newUser);
    }
}
