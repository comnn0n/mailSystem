package org.example.mailingSystem.controller;

import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpSession;
import org.example.mailingSystem.dto.MailDto;
import org.example.mailingSystem.service.EmailService;
import org.springframework.web.bind.annotation.*;

import java.util.HashMap;
import java.util.Map;

@RestController
@CrossOrigin
@RequestMapping(value = "/mail")
public class MailController {

    private EmailService emailService;

    @PostMapping("/sendEmail")
    public String sendEmail(HttpServletRequest request,
                            @RequestParam("senderId") String senderId,
                            @RequestParam("senderName") String senderName,
                            @RequestParam("senderEmail") String senderEmail,
                            @RequestParam("title") String title,
                            @RequestParam("content") String content) {

        HttpSession session = request.getSession();

        MailDto mailDto = new MailDto();
        mailDto.setSenderEmail(senderEmail);
        mailDto.setSenderName(senderName);
        mailDto.setTitle(title);
        mailDto.setContent(content);

        this.emailService.sendSimpleMail(session,mailDto);

        Map<String, String> response = new HashMap<>();
        response.put("status", "200");

        return response.toString();
    }

}
