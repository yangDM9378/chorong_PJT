package com.ssafy.chorongddara.api.service;

import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.JsonNode;
import com.fasterxml.jackson.databind.ObjectMapper;
import org.springframework.http.*;
import org.springframework.stereotype.Service;
import org.springframework.web.client.RestTemplate;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

@Service
public class QuizService {

    public String getQuiz(String region, String culturalProperty) throws JsonProcessingException {
        // JSON 데이터를 맵 형태로 생성
        ObjectMapper objectMapper = new ObjectMapper();
        Map<String, Object> requestBody = new HashMap<>();
        requestBody.put("model", "gpt-3.5-turbo");

        List<Map<String, String>> messages = new ArrayList<>();
        Map<String, String> message = new HashMap<>();
        message.put("role", "user");
        message.put("content", "사실에 기반해서 JSON 형태로 경주에 있는 첨성대 관련해서 4지선다로 문제 3개만 랜덤하게 알려줘 그리고 해설도 알려줘");
        messages.add(message);
        requestBody.put("messages", messages);

        // JSON 맵을 문자열로 변환
        String jsonBody = objectMapper.writeValueAsString(requestBody);

        // chatGPT URL 주소
        String chatGPTUrl = "https://api.openai.com/v1/chat/completions";

        // header 설정
        HttpHeaders headers = new HttpHeaders();
        headers.setContentType(MediaType.APPLICATION_JSON);
        headers.setBearerAuth("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");
        HttpEntity<String> entity = new HttpEntity<>(jsonBody, headers);

        // API 호출
        RestTemplate restTemplate = new RestTemplate();
        ResponseEntity<String> response = restTemplate.exchange(chatGPTUrl, HttpMethod.POST, entity, String.class);

        // response 답변 데이터 추출
        String responseBody = response.getBody();
        JsonNode jsonNode = objectMapper.readTree(responseBody);
        String completedText = jsonNode.get("choices").get(0).get("message").get("content").asText();

        // 문화재 데이터 객체 List 형태로 변환
        return completedText;
    }
}
