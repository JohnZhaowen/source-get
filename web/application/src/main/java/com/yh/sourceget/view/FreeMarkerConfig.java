package com.yh.sourceget.view;

import org.springframework.context.annotation.Configuration;
import org.springframework.web.servlet.config.annotation.WebMvcConfigurerAdapter;

@Configuration
public class FreeMarkerConfig extends WebMvcConfigurerAdapter {

//    @Bean
//    public ViewResolver viewResolver() {
//        FreeMarkerViewResolver resolver = new FreeMarkerViewResolver();
//        resolver.setCache(true);
//        resolver.setPrefix("");
//        resolver.setSuffix(".ftl");
//        resolver.setContentType("text/html; charset=UTF-8");
//        return resolver;
//    }

//    @Bean
//    public FreeMarkerConfigurer freemarkerConfig() throws IOException, TemplateException {
//        FreeMarkerConfigurer configurer = new FreeMarkerConfigurer();
////        configurer.setTemplateLoaderPaths("file:绝对路径","http://www.xxx.com/");
////        configurer.setDefaultEncoding("UTF-8");
////        configurer.setPreferFileSystemAccess(false);
//        return configurer;
//    }

}
