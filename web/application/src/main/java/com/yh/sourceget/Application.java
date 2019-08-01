package com.yh.sourceget;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.transaction.annotation.EnableTransactionManagement;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@SpringBootApplication
@EnableTransactionManagement
@RestController
public class Application {
	
	@Value("${profile.active}")
	private String profiles;
	
	public static void main(String[] args) {
        SpringApplication.run(Application.class, args);      
    }
	
	@RequestMapping("/profile")
	public String profileCheck() {
		return "当前环境为： " + profiles;
	}
	 
}
