package org.example.mailingSystem.service;

import jakarta.servlet.http.HttpSession;
import jakarta.websocket.Session;
import org.example.mailingSystem.dto.MailDto;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.mail.SimpleMailMessage;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class EmailService {

    @Autowired
    private JavaMailSender emailSender;

    public void sendSimpleMail(HttpSession session, MailDto mailDto) {
        SimpleMailMessage message = new SimpleMailMessage();

        message.setFrom(session.getId());
        message.setTo(mailDto.getSenderEmail());
        message.setSubject(mailDto.getTitle());
        message.setText(mailDto.getContent());
        emailSender.send(message);
    }

    public List<MailDto> getMailList(Session session,
                                     MailDto mailDto) {

        List<MailDto> mailList = null;

        return mailList;
    }
}
