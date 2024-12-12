package org.example.mailingSystem.LoginAPI.mapper;

import org.apache.ibatis.annotations.Mapper;
import org.example.mailingSystem.LoginAPI.domain.entity.User;
import org.example.mailingSystem.dto.UserDto;
import org.springframework.data.repository.query.Param;
@Mapper
public interface MemberMapper {
    User loginCheck(UserDto userDto);
}