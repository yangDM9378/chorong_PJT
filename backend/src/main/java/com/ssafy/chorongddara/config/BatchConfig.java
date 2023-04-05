package com.ssafy.chorongddara.config;

import com.ssafy.chorongddara.api.service.QuizService;
import com.ssafy.chorongddara.db.entity.CulturalProperty;
import com.ssafy.chorongddara.db.repository.CulturalPropertyRepository;
import lombok.extern.slf4j.Slf4j;
import org.springframework.batch.core.Job;
import org.springframework.batch.core.Step;
import org.springframework.batch.core.configuration.annotation.EnableBatchProcessing;
import org.springframework.batch.core.configuration.annotation.JobBuilderFactory;
import org.springframework.batch.core.configuration.annotation.StepBuilderFactory;
import org.springframework.batch.repeat.RepeatStatus;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

import java.util.List;

@Slf4j
@Configuration
@EnableBatchProcessing
public class BatchConfig {

    @Autowired
    public JobBuilderFactory jobBuilderFactory;

    @Autowired
    public StepBuilderFactory stepBuilderFactory;

    @Autowired
    private CulturalPropertyRepository culturalPropertyRepository;

    @Autowired
    private QuizService quizService;

    @Bean
    public Job job() {
        Job job = jobBuilderFactory.get("job")
                .start(step())
                .build();

        return job;
    }

    @Bean
    public Step step() {
        return stepBuilderFactory.get("step")
                .tasklet((contribution, chunkContext) -> {
                    log.info("Step 시작");

                    // 문화재 읽어오기
                    List<CulturalProperty> culturalPropertyList = culturalPropertyRepository.findAll();

                    for(CulturalProperty culturalProperty : culturalPropertyList) {
                        // 기존에 존재하는 퀴즈 삭제 후에
                        quizService.deleteQuiz(culturalProperty.getCulturalPropertyId());

                        // 새로운 퀴즈 생성 및 캐시 저장
                        quizService.saveQuiz(culturalProperty);
                    }

                    return RepeatStatus.FINISHED;
                })
                .build();
    }
}
