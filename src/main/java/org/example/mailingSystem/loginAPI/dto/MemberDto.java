package org.example.mailingSystem.LoginAPI.dto;

import lombok.*;

@Data
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class MemberDto {

    private String id;
    private String name;
    private String password;
    private String email;

}