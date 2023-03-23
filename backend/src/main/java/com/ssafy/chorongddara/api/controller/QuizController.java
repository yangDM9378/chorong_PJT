package com.ssafy.chorongddara.api.controller;

import com.fasterxml.jackson.core.JsonProcessingException;
import com.ssafy.chorongddara.api.response.QuizRes;
import com.ssafy.chorongddara.api.service.QuizService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.*;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;


@RestController
@RequestMapping("/quiz")
public class QuizController {
    @Autowired
    private QuizService quizService;

    @GetMapping("/{region}/{culturalProperty}")
    public ResponseEntity<List<QuizRes>> getQuiz(@PathVariable String region, @PathVariable String culturalProperty) throws JsonProcessingException {
        List<QuizRes> result = quizService.getQuiz(region, culturalProperty);
        return ResponseEntity.status(HttpStatus.OK).body(result);
    }
}