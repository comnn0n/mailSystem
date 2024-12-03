package org.example.mailingSystem.dto;

import java.util.Date;

import lombok.*;

@Data
@Getter
@Setter
@ToString
@NoArgsConstructor
public class MailDto {
    private int mailNo;
    private String senderId;
    private String senderName;
    private String senderEmail;
    private String receivedEmail;
    private String title;
    private String content;
    private Date receivedTime;
    private Date sentTime;
    private Boolean isImportant;
    private Boolean isRead;
    private Boolean isBookmarked;
}
