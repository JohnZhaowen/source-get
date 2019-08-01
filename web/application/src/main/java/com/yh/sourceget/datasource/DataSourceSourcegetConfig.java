package com.yh.sourceget.datasource;

import javax.sql.DataSource;

import org.apache.ibatis.session.SqlSessionFactory;
import org.mybatis.spring.SqlSessionFactoryBean;
import org.mybatis.spring.SqlSessionTemplate;
import org.mybatis.spring.annotation.MapperScan;
import org.mybatis.spring.boot.autoconfigure.SpringBootVFS;
import org.springframework.beans.factory.annotation.Qualifier;
import org.springframework.boot.context.properties.ConfigurationProperties;
import org.springframework.boot.jdbc.DataSourceBuilder;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.core.io.support.PathMatchingResourcePatternResolver;
import org.springframework.jdbc.datasource.DataSourceTransactionManager;

@Configuration
@MapperScan(basePackages = "com.yh.sourceget.common.dal.mysqlsourceget.mapper", sqlSessionTemplateRef  = "sourcegetSqlSessionTemplate")
public class DataSourceSourcegetConfig {

    private final String mybatisConfig = "classpath:mybatis/mysql-sourceget-mybatis-config.xml";
    private final String sqlmap = "classpath:sqlmap/mysqlsourceget/*.xml";

    @Bean(name = "sourcegetDataSource")
    @ConfigurationProperties(prefix = "spring.datasource.sourceget")
    public DataSource sourcegetDataSource() {
        return DataSourceBuilder.create().build();
    }

    @Bean(name = "sourcegetSqlSessionFactory")
    public SqlSessionFactory sourcegetSqlSessionFactory(@Qualifier("sourcegetDataSource") DataSource dataSource) throws Exception {
        SqlSessionFactoryBean bean = new SqlSessionFactoryBean();
        bean.setConfigLocation(new PathMatchingResourcePatternResolver().getResource(mybatisConfig));
        bean.setMapperLocations(new PathMatchingResourcePatternResolver().getResources(sqlmap));
        bean.setDataSource(dataSource);
        //保证jar模式运行
        bean.setVfs(SpringBootVFS.class);
        return bean.getObject();
    }

    @Bean(name = "sourcegetTransactionManager")
    public DataSourceTransactionManager sourcegetTransactionManager(@Qualifier("sourcegetDataSource") DataSource dataSource) {
        return new DataSourceTransactionManager(dataSource);
    }

    @Bean(name = "sourcegetSqlSessionTemplate")
    public SqlSessionTemplate sourcegetSqlSessionTemplate(@Qualifier("sourcegetSqlSessionFactory") SqlSessionFactory sqlSessionFactory) throws Exception {
        SqlSessionTemplate sqlSessionTemplate =  new SqlSessionTemplate(sqlSessionFactory);
        return sqlSessionTemplate;
    }

}
