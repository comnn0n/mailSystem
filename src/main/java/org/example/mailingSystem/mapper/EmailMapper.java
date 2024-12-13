package org.example.mailingSystem.mapper;

import org.apache.ibatis.annotations.Mapper;
import org.apache.ibatis.annotations.Param;

@Mapper
public interface EmailMapper {

    void insertMail(@Param("senderEmail") String senderId,
                    @Param("senderName") String senderName,
                    @Param("receivedEmail") String receivedEmail,
                    @Param("title") String title,
                    @Param("content") String content,
                    @Param("isImportant") Boolean isImportant,
                    @Param("isRead") Boolean isRead,
                    @Param("isBookmarked") Boolean isBookmarked);

}
