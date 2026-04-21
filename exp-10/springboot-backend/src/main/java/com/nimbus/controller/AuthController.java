package com.nimbus.controller;

import com.nimbus.controller.dto.AuthResponse;
import com.nimbus.controller.dto.LoginRequest;
import com.nimbus.controller.dto.RegisterRequest;
import com.nimbus.model.Role;
import com.nimbus.model.User;
import com.nimbus.repository.UserRepository;
import com.nimbus.security.JwtTokenProvider;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.web.bind.annotation.*;

import java.util.HashMap;

@RestController
@RequestMapping("/api/auth")
@RequiredArgsConstructor
public class AuthController {

    private final AuthenticationManager authenticationManager;
    private final UserRepository userRepository;
    private final PasswordEncoder passwordEncoder;
    private final JwtTokenProvider tokenProvider;

    @PostMapping("/login")
    public ResponseEntity<?> login(@RequestBody LoginRequest loginRequest) {
        Authentication authentication = authenticationManager.authenticate(
                new UsernamePasswordAuthenticationToken(loginRequest.getEmail(), loginRequest.getPassword())
        );

        String jwt = tokenProvider.generateToken(authentication);
        User user = userRepository.findByEmail(loginRequest.getEmail()).orElseThrow();

        AuthResponse.UserDto userDto = new AuthResponse.UserDto(
                user.getId(),
                user.getName(),
                user.getEmail(),
                user.getRole().name().toLowerCase(),
                new HashMap<>() // Return empty learner profile mapping for now
        );

        return ResponseEntity.ok(new AuthResponse(jwt, userDto));
    }

    @PostMapping("/register")
    public ResponseEntity<?> register(@RequestBody RegisterRequest request) {
        if (userRepository.findByEmail(request.getEmail()).isPresent()) {
            return ResponseEntity.badRequest().body(new HashMap<String, String>() {{
                put("error", "Email already in use");
            }});
        }

        User user = new User();
        user.setName(request.getName());
        user.setEmail(request.getEmail());
        user.setPasswordHash(passwordEncoder.encode(request.getPassword()));
        
        if (request.getRole() != null) {
            try {
                user.setRole(Role.valueOf(request.getRole().toUpperCase()));
            } catch (IllegalArgumentException e) {
                user.setRole(Role.STUDENT);
            }
        } else {
            user.setRole(Role.STUDENT);
        }

        if (user.getRole() == Role.STUDENT && request.getStudentId() != null) {
            user.setStudentId(request.getStudentId());
        }

        userRepository.save(user);

        // Auto login after registration
        Authentication authentication = authenticationManager.authenticate(
                new UsernamePasswordAuthenticationToken(request.getEmail(), request.getPassword())
        );

        String jwt = tokenProvider.generateToken(authentication);

        AuthResponse.UserDto userDto = new AuthResponse.UserDto(
                user.getId(),
                user.getName(),
                user.getEmail(),
                user.getRole().name().toLowerCase(),
                new HashMap<>()
        );

        return ResponseEntity.ok(new AuthResponse(jwt, userDto));
    }

    @GetMapping("/me")
    public ResponseEntity<?> getCurrentUser(Authentication authentication) {
        User user = userRepository.findByEmail(authentication.getName()).orElseThrow();
        
        AuthResponse.UserDto userDto = new AuthResponse.UserDto(
                user.getId(),
                user.getName(),
                user.getEmail(),
                user.getRole().name().toLowerCase(),
                new HashMap<>()
        );

        return ResponseEntity.ok(userDto);
    }
}
