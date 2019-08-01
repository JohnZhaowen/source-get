package com.yh.sourceget.web.home.controller;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.servlet.ModelAndView;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

@Controller
public class PageController {

    @RequestMapping(value="/home" , method = RequestMethod.GET)
    public ModelAndView index(ModelAndView mv){
        mv.addObject("name", "jack");
        mv.setViewName("home");
        return mv;
    }

    @RequestMapping(value="/" , method = RequestMethod.GET)
    public ModelAndView indexall(ModelAndView mv){
        mv.addObject("name", "jack");
        mv.setViewName("home");
        return mv;
    }

    @RequestMapping(value="/restpage" , method = RequestMethod.GET)
    public String index1(ModelAndView mv){

        return "rest";
    }

    @RequestMapping("/freemarker")
    public String freemarker(Map<String, Object> map){
        map.put("name", "Joe");
        map.put("sex", 1);    //sex:性别，1：男；0：女；

        // 模拟数据
        List<Map<String, Object>> friends = new ArrayList<Map<String, Object>>();
        Map<String, Object> friend = new HashMap<String, Object>();
        friend.put("name", "xbq");
        friend.put("age", 22);
        friends.add(friend);
        friend = new HashMap<String, Object>();
        friend.put("name", "July");
        friend.put("age", 18);
        friends.add(friend);
        map.put("friends", friends);
        return "freemarker";
    }


    @RequestMapping(value="/charpage" , method = RequestMethod.GET)
    public ModelAndView charpage(ModelAndView mv){
        mv.setViewName("home/charpage");
        return mv;
    }

    @RequestMapping(value="/charpagechild" , method = RequestMethod.GET)
    public ModelAndView charpagechild(ModelAndView mv){
        mv.setViewName("home/charpagechild");
        return mv;
    }

}
