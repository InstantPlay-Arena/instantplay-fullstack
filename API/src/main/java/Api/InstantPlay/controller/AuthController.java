package Api.InstantPlay.controller;

import Api.InstantPlay.models.User;
import Api.InstantPlay.service.AuthService;
import org. springframework.beans.factory.annotation. Autowired;
import org. springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.Map;

@RestController
@RequestMapping("/api/auth")
@CrossOrigin(origins = "*", maxAge = 3600)
public class AuthController {

    @Autowired
    private AuthService authService;

    @PostMapping("/login")
    public ResponseEntity<?> login(@RequestBody Map<String, String> credentials) {
        try {
            String username = credentials.get("username");
            String password = credentials.get("password");

            if (username == null || username.isEmpty()) {
                return ResponseEntity.badRequest().body(Map.of("message", "Username is required"));
            }

            if (password == null || password.isEmpty()) {
                return ResponseEntity. badRequest().body(Map.of("message", "Password is required"));
            }

            Map<String, Object> response = authService.login(username, password);
            return ResponseEntity.ok(response);
        } catch (Exception e) {
            return ResponseEntity.badRequest(). body(Map.of("message", "Invalid username or password! "));
        }
    }

    @PostMapping("/register")
    public ResponseEntity<?> register(@RequestBody User user) {
        try {
            if (user. getUsername() == null || user. getUsername().isEmpty()) {
                return ResponseEntity.badRequest().body(Map.of("message", "Username is required"));
            }

            if (user.getEmail() == null || user.getEmail().isEmpty()) {
                return ResponseEntity.badRequest().body(Map.of("message", "Email is required"));
            }

            if (user.getPassword() == null || user.getPassword(). length() < 6) {
                return ResponseEntity.badRequest().body(Map.of("message", "Password must be at least 6 characters"));
            }

            Map<String, String> response = authService.register(user);
            return ResponseEntity.ok(response);
        } catch (RuntimeException e) {
            return ResponseEntity.badRequest().body(Map.of("message", e.getMessage()));
        }
    }
}