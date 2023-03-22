package com.ssafy.chorongddara.api.service;

import com.fasterxml.jackson.core.JsonProcessingException;
import com.ssafy.chorongddara.api.response.QuizRes;

import java.util.List;

public interface QuizService {
    public List<QuizRes> getQuiz(String region, String culturalProperty) throws JsonProcessingException;
}
