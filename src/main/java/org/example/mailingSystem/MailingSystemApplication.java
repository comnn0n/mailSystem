package org.example.mailingSystem;

import org.mybatis.spring.annotation.MapperScan;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;

@MapperScan(basePackages = "org.example.mailingSystem.LoginAPI.mapper")
@SpringBootApplication
public class MailingSystemApplication {
    public static void main(String[] args) {
        SpringApplication.run(MailingSystemApplication.class, args);
    }
}
