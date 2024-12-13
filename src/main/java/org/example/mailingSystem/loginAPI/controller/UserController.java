package org.example.mailingSystem.LoginAPI.controller;

import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpSession;
import org.example.mailingSystem.LoginAPI.domain.entity.User;
import org.example.mailingSystem.LoginAPI.domain.repository.UserRepository;
import org.example.mailingSystem.LoginAPI.dto.LoginRequest;
import org.example.mailingSystem.LoginAPI.service.AuthService;
import org.example.mailingSystem.Token.JwtTokenProvider;
import org.example.mailingSystem.dto.UserDto;
import org.mybatis.spring.annotation.MapperScan;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.web.bind.annotation.*;

import java.util.HashMap;
import java.util.Map;

@RestController
@RequestMapping("/user")
public class UserController {

    private final AuthService authService;
    private UserRepository userRepository;
    private PasswordEncoder passwordEncoder;
    private JwtTokenProvider jwtTokenProvider;

    public UserController(AuthService authService) {
        this.authService = authService;
    }

    // 로그인 처리
    @PostMapping("/login")
    public ResponseEntity<Map<String, String>> login(@RequestBody LoginRequest loginRequest) {
        String token = authService.login(loginRequest.getEmail(), loginRequest.getPassword());
        Map<String, String> response = new HashMap<>();
        response.put("token", token);
        response.put("message", "Login successful!");
        return ResponseEntity.ok(response);
    }

    // 로그아웃 처리
    @PostMapping("/logout")
    public ResponseEntity<String> logout(HttpServletRequest request) {
        HttpSession session = request.getSession(false);
        if (session != null) {
            session.invalidate();
        }
        return ResponseEntity.ok("Logged out successfully");
    }

    // 로그인 아이디/이메일 중복확인
    @PostMapping("/loginCheck")
    public ResponseEntity<String> loginCheck(@RequestBody UserDto userDto){
        User userInfo = authService.loginCheck(userDto);
        if (userInfo != null) {
            // 중복이 있다면
            return ResponseEntity.status(HttpStatus.CONFLICT).body("Duplicate user found");
        } else {
            // 중복이 없다면
            return ResponseEntity.status(HttpStatus.OK).body("No duplicate user");
        }
    }

    // 회원가입 처리
    @PostMapping("/register")
    public ResponseEntity<String> registerUser(@RequestBody LoginRequest loginRequest){
        loginRequest.setId(loginRequest.getId());
        loginRequest.setEmail(loginRequest.getEmail());
        loginRequest.setPassword(loginRequest.getPassword());
        loginRequest.setName(loginRequest.getName());
        loginRequest.setRole(loginRequest.getRole());
        authService.registerUser(loginRequest.getId(), loginRequest.getEmail(), loginRequest.getPassword(), loginRequest.getName(), loginRequest.getRole());
        return ResponseEntity.ok("User registered successfully");
    }
}