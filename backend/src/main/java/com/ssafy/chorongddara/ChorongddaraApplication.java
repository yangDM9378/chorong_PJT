package com.ssafy.chorongddara;

import org.springframework.batch.core.configuration.annotation.EnableBatchProcessing;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.boot.autoconfigure.web.servlet.MultipartAutoConfiguration;
import org.springframework.scheduling.annotation.EnableScheduling;

@EnableScheduling
@EnableBatchProcessing
@SpringBootApplication(exclude={MultipartAutoConfiguration.class})
public class ChorongddaraApplication {

    public static void main(String[] args) {
        SpringApplication.run(ChorongddaraApplication.class, args);
    }

}
