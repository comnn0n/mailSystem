package org.example.mailingSystem.service;

import ch.qos.logback.core.util.StringUtil;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import jakarta.servlet.http.HttpSession;
import jakarta.websocket.Session;
import org.example.mailingSystem.dto.MailDto;
import org.example.mailingSystem.mapper.EmailMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.mail.SimpleMailMessage;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

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
//        SimpleMailMessage message = new SimpleMailMessage();
//
//        message.setFrom(session.getId());
//        message.setTo(mailDto.getSenderEmail());
//        message.setSubject(mailDto.getTitle());
//        message.setText(mailDto.getContent());
//        emailSender.send(message);

        if(StringUtil.isNullOrEmpty(mailDto.getSenderEmail()) ||
                StringUtil.isNullOrEmpty(mailDto.getSenderName())) {
            throw new Exception("사용자 정보가 없습니다.");
        }

        if(StringUtil.isNullOrEmpty(mailDto.getReceivedEmail()) ||
                !mailDto.getReceivedEmail().contains("@")) {
            throw new Exception("받으실 분의 메일주소를 정확히 입력해주세요.");
        }
        
        if(StringUtil.isNullOrEmpty(mailDto.getContent())) {
            throw new Exception("내용을 입력해주세요.");
        }

        this.emailMapper.insertMail(mailDto.getSenderEmail(),
                                    mailDto.getSenderName(),
                                    mailDto.getReceivedEmail(),
                                    mailDto.getTitle(),
                                    mailDto.getContent(),
                                    false,
                                    false,
                                    false);

    }

    public List<MailDto> getMailList(Session session,
                                     MailDto mailDto) {

        List<MailDto> mailList = null;

        return mailList;
    }
}
