package com.ssafy.chorongddara.api.controller;

import com.fasterxml.jackson.core.JsonProcessingException;
import com.ssafy.chorongddara.api.response.QuizRes;
import com.ssafy.chorongddara.api.service.QuizService;
import com.ssafy.chorongddara.common.codes.SuccessCode;
import com.ssafy.chorongddara.common.response.ApiResponse;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.*;
import org.springframework.web.bind.annotation.*;
import java.util.List;

@CrossOrigin(origins = "*")
@RestController
@RequestMapping("/quiz")
public class QuizController {
    @Autowired
    private QuizService quizService;

    @GetMapping("/{culturalPropertyId}")
    public ResponseEntity<ApiResponse<Object>> getQuiz(@PathVariable Integer culturalPropertyId) throws JsonProcessingException {
        List<QuizRes> quizs = quizService.getQuiz(culturalPropertyId);

        ApiResponse<Object> ar = ApiResponse.builder()
                .result(quizs)
                .resultCode(SuccessCode.SELECT.getStatus())
                .resultMsg(SuccessCode.SELECT.getMessage())
                .build();
        return new ResponseEntity<>(ar, HttpStatus.OK);
    }
}
