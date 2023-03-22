package com.ssafy.chorongddara.api.service;

import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.JsonNode;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.ssafy.chorongddara.api.response.QuizRes;
import org.springframework.http.*;
import org.springframework.stereotype.Service;
import org.springframework.web.client.RestTemplate;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

@Service
public class QuizServiceImpl implements QuizService {

    public List<QuizRes> getQuiz(String region, String culturalProperty) throws JsonProcessingException {
        // JSON 데이터를 맵 형태로 생성
        String apiKey = "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";
        String preText = "이제부터 문화재에 관해 질문을 할껀데 아래의 JSON 형식으로 대답해줘\n" +
                "{\n" +
                "\"questions\": [\n" +
                "{\"question\": \"\", \"options\": [\"\", \"\", \"\", \"\"], \"answer\": \"\", \"explanation\": \"\"},\n" +
                "{\"question\": \"\", \"options\": [\"\", \"\", \"\", \"\"], \"answer\": \"\", \"explanation\": \"\"},\n" +
                "{\"question\": \"\", \"options\": [\"\", \"\", \"\", \"\"], \"answer\": \"\", \"explanation\": \"\"}\n" +
                "]\n" +
                "}";

        // JSON 데이터를 맵 형태로 생성
        ObjectMapper objectMapper = new ObjectMapper();
        Map<String, Object> requestBody = new HashMap<>();
        requestBody.put("model", "gpt-3.5-turbo");

        List<Map<String, String>> messages = new ArrayList<>();
        Map<String, String> message = new HashMap<>();
        message.put("role", "user");
        message.put("content", preText + "사실에 기반해서 JSON 형태로"+ region +"에 있는"+ culturalProperty + " 관련해서 4지선다로 문제 3개만 랜덤하게 알려줘 그리고 해설도 알려줘");
        messages.add(message);
        requestBody.put("messages", messages);

        // JSON 맵을 문자열로 변환
        String jsonBody = objectMapper.writeValueAsString(requestBody);

        // chatGPT URL 주소
        String chatGPTUrl = "https://api.openai.com/v1/chat/completions";

        // header 설정
        HttpHeaders headers = new HttpHeaders();
        headers.setContentType(MediaType.APPLICATION_JSON);
        headers.setBearerAuth(apiKey);
        HttpEntity<String> entity = new HttpEntity<>(jsonBody, headers);

        // API 호출
        RestTemplate restTemplate = new RestTemplate();
        ResponseEntity<String> response = restTemplate.exchange(chatGPTUrl, HttpMethod.POST, entity, String.class);

        // response 답변 데이터 추출
        String responseBody = response.getBody();
        JsonNode jsonNode = objectMapper.readTree(responseBody);
        String completedText = jsonNode.get("choices").get(0).get("message").get("content").asText();

        // 문화재 데이터 객체 List 형태로 변환
        String[] lines = completedText.split("\r?\n|\r");
        StringBuilder jsonStr = new StringBuilder();
        for (String line : lines ){
            if (!line.isEmpty()){
                jsonStr.append(line);
            }
        }
        JsonNode resultNode = objectMapper.readTree(String.valueOf(jsonStr));
        JsonNode resultQuestions = resultNode.get("questions");

        List <QuizRes> quizzes = new ArrayList<>();
        for (JsonNode question : resultQuestions){
            QuizRes quiz = objectMapper.treeToValue(question, QuizRes.class);
            quizzes.add(quiz);
        }

        return quizzes;
    }
}
