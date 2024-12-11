package org.example.mailingSystem.mapper;

import org.apache.ibatis.annotations.Mapper;
import org.apache.ibatis.annotations.Param;
import org.example.mailingSystem.dto.MailDto;

import java.util.List;

@Mapper
public interface EmailMapper {

    void insertMail(@Param("senderEmail") String senderId,
                    @Param("senderName") String senderName,
                    @Param("receiverEmail") String receiverEmail,
                    @Param("title") String title,
                    @Param("content") String content,
                    @Param("isImportant") Boolean isImportant,
                    @Param("isRead") Boolean isRead,
                    @Param("isBookmarked") Boolean isBookmarked);

    List<MailDto> selectMailList(@Param("senderId") String senderId,
                                 @Param("pageNum") int pageNum);

    int selectMailListCount(@Param("senderId") String senderId);

    void updateEmail(@Param("mailNo") int mailNo,
                     @Param("isImportant") Boolean isImportant,
                     @Param("isRead") Boolean isRead,
                     @Param("isBookmarked") Boolean isBookmarked);

}
