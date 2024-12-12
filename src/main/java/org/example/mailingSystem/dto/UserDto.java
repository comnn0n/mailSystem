package org.example.mailingSystem.dto;


import lombok.Data;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Data
@Getter
@Setter
@NoArgsConstructor
public class UserDto {
    private String id;
    private String email;

    // 기본 생성자, getter, setter
    public UserDto(String id, String email) {
        this.id = id;
        this.email = email;
    }

    public void setId(String id) {
        this.id = id;
    }

    public void setEmail(String email) {
        this.email = email;
    }

    public String getId() {
        return id;
    }

    public String getEmail() {
        return email;
    }
}
