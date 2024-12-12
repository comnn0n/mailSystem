package org.example.mailingSystem.LoginAPI.domain.entity;

import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import lombok.Getter;
import lombok.Setter;

import java.util.UUID;

@Entity
@Getter
@Setter
public class User {
    @Id
    private String id;
    private String name;
    private String email;
    private String password;
    private String role;

    public User(){
        if(this.id == null){
            this.id = UUID.randomUUID().toString();
        }
    }

    public User(String email, String password, String name, String role, String id){
        this.email = email;
        this.password = password;
        this.name = name;
        this.role = role;
        this.id = id;
    }

    public String getId() {
        return id;
    }

    public void setId(String id) {
        this.id = id;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public String getEmail() {
        return email;
    }

    public void setEmail(String email) {
        this.email = email;
    }

    public String getPassword() {
        return password;
    }

    public void setPassword(String password) {
        this.password = password;
    }

    public String getRole() {
        return role;
    }

    public void setRole(String role) {
        this.role = role;
    }
}
