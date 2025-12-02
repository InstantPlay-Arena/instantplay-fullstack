package Api.InstantPlay.service;

import Api.InstantPlay.models.Role;
import Api.InstantPlay.models.enums.RoleName;
import Api.InstantPlay.models.User;
import Api.InstantPlay.repository.RoleRepository;
import Api.InstantPlay.repository.UserRepository;
import Api.InstantPlay.config.JwtUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core. GrantedAuthority;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.*;
import java.util.stream. Collectors;

@Service
public class AuthService {

    @Autowired
    private AuthenticationManager authenticationManager;

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private RoleRepository roleRepository;

    @Autowired
    private PasswordEncoder passwordEncoder;

    @Autowired
    private JwtUtils jwtUtils;

    @Transactional
    public Map<String, Object> login(String username, String password) {
        Authentication authentication = authenticationManager.authenticate(
                new UsernamePasswordAuthenticationToken(username, password)
        );

        SecurityContextHolder.getContext().setAuthentication(authentication);
        String jwt = jwtUtils.generateJwtToken(authentication);

        UserDetails userDetails = (UserDetails) authentication.getPrincipal();
        List<String> roles = userDetails.getAuthorities().stream()
                .map(GrantedAuthority::getAuthority)
                .collect(Collectors. toList());

        User user = userRepository.findByUsername(userDetails.getUsername())
                . orElseThrow(() -> new RuntimeException("User not found"));

        Map<String, Object> response = new HashMap<>();
        response.put("token", jwt);
        response.put("type", "Bearer");
        response. put("id", user.getId());
        response.put("username", user.getUsername());
        response.put("email", user.getEmail());
        response.put("fullName", user.getFullName());
        response.put("roles", roles);

        return response;
    }

    @Transactional
    public Map<String, String> register(User user) {
        if (userRepository.existsByUsername(user. getUsername())) {
            throw new RuntimeException("Username is already taken!");
        }

        if (userRepository. existsByEmail(user.getEmail())) {
            throw new RuntimeException("Email is already in use!");
        }

        // Encoder le mot de passe
        user.setPassword(passwordEncoder.encode(user.getPassword()));

        // Assigner le rôle USER par défaut
        Set<Role> roles = new HashSet<>();
        Role userRole = roleRepository.findByName(RoleName. ROLE_USER)
                .orElseThrow(() -> new RuntimeException("Role USER not found"));
        roles.add(userRole);
        user. setRoles(roles);

        userRepository.save(user);

        Map<String, String> response = new HashMap<>();
        response.put("message", "User registered successfully!");
        return response;
    }
}