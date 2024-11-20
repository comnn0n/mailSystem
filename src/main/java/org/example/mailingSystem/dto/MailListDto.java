package org.example.mailingSystem.dto;

import java.util.Date;

public class MailListDto {
    private int mail_no;
    private String sender_id;
    private String sender_name;
    private String sender_email;
    private String title;
    private String content;
    private Date received_time;
    private Date sent_item;
    private Boolean is_important;
    private Boolean is_read;
    private Boolean is_bookmarked;

    public MailListDto(int mail_no, String sender_id, String sender_name, String sender_email, String title, String content, Date received_time, Date sent_item, Boolean is_important, Boolean is_read, Boolean is_bookmarked) {
        this.mail_no = mail_no;
        this.sender_id = sender_id;
        this.sender_name = sender_name;
        this.sender_email = sender_email;
        this.title = title;
        this.content = content;
        this.received_time = received_time;
        this.sent_item = sent_item;
        this.is_important = is_important;
        this.is_read = is_read;
        this.is_bookmarked = is_bookmarked;
    }

    public int getMail_no() {
        return mail_no;
    }

    public String getSender_id() {
        return sender_id;
    }

    public String getSender_name() {
        return sender_name;
    }

    public String getSender_email() {
        return sender_email;
    }

    public String getTitle() {
        return title;
    }

    public String getContent() {
        return content;
    }

    public Date getReceived_time() {
        return received_time;
    }

    public Date getSent_item() {
        return sent_item;
    }

    public Boolean getIs_important() {
        return is_important;
    }

    public Boolean getIs_read() {
        return is_read;
    }

    public Boolean getIs_bookmarked() {
        return is_bookmarked;
    }

    public void setMail_no(int mail_no) {
        this.mail_no = mail_no;
    }

    public void setSender_id(String sender_id) {
        this.sender_id = sender_id;
    }

    public void setSender_name(String sender_name) {
        this.sender_name = sender_name;
    }

    public void setSender_email(String sender_email) {
        this.sender_email = sender_email;
    }

    public void setTitle(String title) {
        this.title = title;
    }

    public void setContent(String content) {
        this.content = content;
    }

    public void setReceived_time(Date received_time) {
        this.received_time = received_time;
    }

    public void setSent_item(Date sent_item) {
        this.sent_item = sent_item;
    }

    public void setIs_important(Boolean is_important) {
        this.is_important = is_important;
    }

    public void setIs_read(Boolean is_read) {
        this.is_read = is_read;
    }

    public void setIs_bookmarked(Boolean is_bookmarked) {
        this.is_bookmarked = is_bookmarked;
    }
}
