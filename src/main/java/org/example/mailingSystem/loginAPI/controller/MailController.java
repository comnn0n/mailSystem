package org.example.mailingSystem.loginAPI.controller;

import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import jakarta.servlet.http.HttpSession;
import org.example.mailingSystem.dto.MailDto;
import org.example.mailingSystem.loginAPI.service.EmailService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.Map;

@RestController
@CrossOrigin(origins="*")
@RequestMapping(value = "/api/mail", produces = "text/plain;charset=UTF-8")
public class MailController {

    @Autowired
    private EmailService emailService;

    @RequestMapping(value = "/getEmail", method = RequestMethod.POST, produces = "application/json; charset=UTF8")
    @ResponseBody
    public Map<String, Object> getEmail(HttpServletRequest request,
                                  @RequestParam(value = "page") int page,
                                  HttpServletResponse response) {

        HttpSession session = request.getSession(true);

//        String userId = (String) session.getAttribute("userId");

        Map<String, Object> result = this.emailService.getMailList(session,
                                                                    page);

        return result;
    }

    @RequestMapping(value = "/sendEmail", method = RequestMethod.POST, produces = "application/json; charset=UTF8")
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

    @RequestMapping(value = "/updEmail", method = RequestMethod.POST, produces = "application/json; charset=UTF8")
    @ResponseBody
    public void updEmail(HttpServletRequest request,
                         @RequestParam(value = "mailNo") int mailNo,
                         @RequestParam(value = "isImportant", required = false) Boolean isImportant,
                         @RequestParam(value = "isRead", required = false) Boolean isRead,
                         @RequestParam(value = "isBookmarked", required = false) Boolean isBookmarked) throws Exception {

        HttpSession session = request.getSession();

        this.emailService.updEmail(session,
                                    mailNo,
                                    isImportant,
                                    isRead,
                                    isBookmarked);

    }

}
