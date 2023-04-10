package com.ssafy.chorongddara.api.service;

import com.fasterxml.jackson.core.JsonProcessingException;
import com.ssafy.chorongddara.api.response.QuizRes;
import com.ssafy.chorongddara.db.entity.CulturalProperty;

import java.util.List;

public interface QuizService {
    List<QuizRes> getQuiz(Integer culturalPropertyId);

    void saveQuiz(CulturalProperty culturalProperty) throws JsonProcessingException;

    void deleteQuiz(Integer culturalPropertyId);
}
