package org.example.mailingSystem.service;

import ch.qos.logback.core.util.StringUtil;
import jakarta.servlet.http.HttpSession;
import org.example.mailingSystem.dto.MailDto;
import org.example.mailingSystem.mapper.EmailMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.mail.SimpleMailMessage;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.sql.Timestamp;
import java.util.Date;
import java.util.List;

@Service
public class EmailService {

    @Autowired
    private JavaMailSender emailSender;

    @Autowired
    private EmailMapper emailMapper;

    @Transactional
    public void sendSimpleMail(HttpSession session,
                               MailDto mailDto) throws Exception {

        if(StringUtil.isNullOrEmpty(mailDto.getSenderEmail()) ||
                StringUtil.isNullOrEmpty(mailDto.getSenderName())) {
            throw new Exception("사용자 정보가 없습니다.");
        }

        if(StringUtil.isNullOrEmpty(mailDto.getReceiverEmail()) ||
                !mailDto.getReceiverEmail().contains("@")) {
            throw new Exception("받으실 분의 메일주소를 정확히 입력해주세요.");
        }
        
        if(StringUtil.isNullOrEmpty(mailDto.getContent())) {
            throw new Exception("내용을 입력해주세요.");
        }

        SimpleMailMessage message = new SimpleMailMessage();

        message.setFrom(mailDto.getSenderEmail());
        message.setTo(mailDto.getReceiverEmail());
//        message.setCc(mailDto.getCc());
//        message.setBcc(mailDto.getBcc());
        message.setSentDate(new Date());
        message.setSubject(mailDto.getTitle());
        message.setText(mailDto.getContent());
        emailSender.send(message);

        this.emailMapper.insertMail(mailDto.getSenderEmail(),
                                    mailDto.getSenderName(),
                                    mailDto.getReceiverEmail(),
                                    mailDto.getTitle(),
                                    mailDto.getContent(),
                                    false,
                                    false,
                                    false);

    }

    public List<MailDto> getMailList(HttpSession session) {

        //        String senderId = session.getId();
        String senderId = "melong4609@gmail.com";

        List<MailDto> mailList = this.emailMapper.selectMailList(senderId);

        return mailList;
    }

    public void updEmail (HttpSession session,
                          int mailNo,
                          Boolean isImportant,
                          Boolean isRead,
                          Boolean isBookmarked) {

        this.emailMapper.updateEmail(mailNo,
                                    isImportant,
                                    isRead,
                                    isBookmarked);

    }
}
