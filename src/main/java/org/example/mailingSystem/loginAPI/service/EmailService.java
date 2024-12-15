package org.example.mailingSystem.loginAPI.service;

import ch.qos.logback.core.util.StringUtil;
import jakarta.servlet.http.HttpSession;
import org.example.mailingSystem.dto.MailDto;
import org.example.mailingSystem.loginAPI.mapper.EmailMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.mail.SimpleMailMessage;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.Date;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

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

    public Map<String, Object> getMailList(HttpSession session,
                                     int page) {

        String senderEmail = session.getAttribute("userEmail").toString();
        //        String senderEmail = "melong4609@gmail.com";

        if (senderEmail == null) {
            // 세션에 userEmail이 없는 경우 처리
            throw new IllegalStateException("User email not found in session");
        }

        int pageNum = (page - 1) * 10;

        List<MailDto> mailList = this.emailMapper.selectMailList(senderEmail,
                                                                 pageNum);

        int count = this.emailMapper.selectMailListCount(senderEmail);

        Map<String, Object> resultMap = new HashMap();
        resultMap.put("mailList", mailList);
        resultMap.put("count", count);


        return resultMap;
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
