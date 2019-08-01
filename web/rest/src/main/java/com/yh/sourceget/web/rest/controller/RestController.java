package com.yh.sourceget.web.rest.controller;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;

@Controller
public class RestController {
	
	@RequestMapping("/rest")
	@ResponseBody
	public String hello() {
		
		return "hello Rest";
	}
}
