package com.ssafy.chorongddara.api.controller;

import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.JsonNode;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.ssafy.chorongddara.api.response.QuizRes;
import com.ssafy.chorongddara.api.service.QuizService;
import org.apache.coyote.Response;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.*;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.client.RestTemplate;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;


@RestController
@RequestMapping("/api/v1/quiz")
public class QuizController {
    @Autowired
    private QuizService quizService;

    @GetMapping("/{region}/{culturalProperty}")
    public ResponseEntity<List<QuizRes>> getQuiz(@PathVariable String region, @PathVariable String culturalProperty) throws JsonProcessingException {
        List<QuizRes> result = quizService.getQuiz(region, culturalProperty);
        return ResponseEntity.status(HttpStatus.OK).body(result);
    }
}