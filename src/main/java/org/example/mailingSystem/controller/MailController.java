package org.example.mailingSystem.controller;

import com.fasterxml.jackson.databind.util.JSONPObject;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import jakarta.servlet.http.HttpSession;
import org.apache.tomcat.util.json.JSONParser;
import org.example.mailingSystem.dto.MailDto;
import org.example.mailingSystem.service.EmailService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

@RestController
@CrossOrigin(origins="*")
@RequestMapping(value = "/api/mail", produces = "text/plain;charset=UTF-8")
public class MailController {

    @Autowired
    private EmailService emailService;

    @RequestMapping(value = "/getEmail", method = RequestMethod.GET, produces = "application/json; charset=UTF8")
    @ResponseBody
    public List<MailDto> getEmail(HttpServletRequest request,
                                       HttpServletResponse response) {

        HttpSession session = request.getSession();

        List<MailDto> mailList = this.emailService.getMailList(session);

        JSONParser jsonParser = new JSONParser(mailList.toString());
        System.out.println(jsonParser);

        return mailList;
    }

    @RequestMapping(value = "/sendEmail", method = RequestMethod.POST)
    @ResponseBody
    public String sendEmail(HttpServletRequest request,
                            @RequestBody MailDto mailDto) throws Exception {

        HttpSession session = request.getSession();

//        MailDto mailDto = new MailDto();
//        mailDto.setSenderEmail(senderEmail);
//        mailDto.setreceiverEmail(receiverEmail);
//        mailDto.setSenderName(senderName);
//        mailDto.setTitle(title);
//        mailDto.setContent(content);

        this.emailService.sendSimpleMail(session,
                                        mailDto);

//        Map<String, String> response = new HashMap<>();
//        response.put("status", "200");
//

        return "1";
    }

}
