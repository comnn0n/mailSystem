package org.example.mailingSystem.LoginAPI.service;

import org.example.mailingSystem.LoginAPI.domain.entity.User;
import org.example.mailingSystem.LoginAPI.domain.repository.UserRepository;
import org.example.mailingSystem.LoginAPI.mapper.MemberMapper;
import org.example.mailingSystem.Token.JwtTokenProvider;
import org.example.mailingSystem.dto.UserDto;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.web.bind.annotation.RequestBody;

import java.util.Optional;

@Service
public class AuthService {
    private final UserRepository userRepository;
    private final PasswordEncoder passwordEncoder;
    private final JwtTokenProvider jwtTokenProvider;
    private final MemberMapper memberMapper;

    @Autowired
    public AuthService(UserRepository userRepository, PasswordEncoder passwordEncoder, JwtTokenProvider jwtTokenProvider, MemberMapper memberMapper){
        this.userRepository = userRepository;
        this.passwordEncoder = passwordEncoder;
        this.jwtTokenProvider = jwtTokenProvider;
        this.memberMapper = memberMapper;
    }

    public boolean authenticate(String email, String password){
        User user = userRepository.findByEmail(email).orElse(null);
        if(user != null && passwordEncoder.matches(password, user.getPassword())){
            return true;
        }
        return false;
    }

    public String login(String email, String rawPassword) {
        Optional<User> optionalUser = userRepository.findByEmail(email);

        // Optional<User>에서 값이 없으면 예외 처리
        User user = optionalUser.orElseThrow(() -> new IllegalArgumentException("User not found"));

        // 비밀번호 확인
        if (!passwordEncoder.matches(rawPassword, user.getPassword())) {
            throw new IllegalArgumentException("Invalid password");
        } else {
            System.out.println("login success!");
        }

        return jwtTokenProvider.createToken(email, user.getRole());
    }

    // 로그인 아이디/이메일 중복확인
    public User loginCheck(UserDto userDto){
        System.out.println("identifier: " + userDto);

        User userInfo = memberMapper.loginCheck(userDto);
        return userInfo;
    }

    public void registerUser(String id, String email, String rawPassword, String name, String role){
        String encodedPassword = passwordEncoder.encode(rawPassword);
        User user = new User();
        user.setId(id);
        user.setEmail(email);
        user.setPassword(encodedPassword);
        user.setName(name);
        user.setRole(role);
        userRepository.save(user);
    }
}