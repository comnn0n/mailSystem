package org.example.mailingSystem.Token;

import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.SignatureAlgorithm;
import io.jsonwebtoken.security.Keys;
import jakarta.annotation.PostConstruct;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Component;

import javax.crypto.SecretKey;
import java.nio.charset.StandardCharsets;
import java.security.Key;
import java.util.Base64;
import java.util.Date;

@Component
public class JwtTokenProvider {

    @Value("${jwt.secret}")
    private String secretKey;
    private long validityInMilliseconds = 3600000; // 1시간
    private SecretKey key; // 안전한 SecretKey 객체

    @PostConstruct
    protected void init() {
        if (secretKey.length() < 32) {
            throw new IllegalArgumentException("The secret key must be at least 32 characters long.");
        }
        secretKey = Base64.getEncoder().encodeToString(secretKey.getBytes(StandardCharsets.UTF_8));
        System.out.println("Encoded secretKey: " + secretKey);
    }

    // JWT 생성 메서드
    public String createToken(String email, String role) {
        Date now = new Date();
        Date validity = new Date(now.getTime() + validityInMilliseconds);

        return Jwts.builder()
                .setSubject(email)
                .claim("role", role)
                .setIssuedAt(now)
                .setExpiration(validity)
                .signWith(SignatureAlgorithm.HS256, Keys.hmacShaKeyFor(Base64.getDecoder().decode(secretKey)))
                .compact();
    }
}
