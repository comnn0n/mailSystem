package org.example.mailingSystem.dto;

import lombok.*;

@Data
@Getter
@Setter
@ToString(exclude = "password")
@NoArgsConstructor
public class UserDto {
    private String id;
    private String name;
    private String password;
}
