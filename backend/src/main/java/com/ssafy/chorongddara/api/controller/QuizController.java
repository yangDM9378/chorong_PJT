package com.ssafy.chorongddara.api.controller;

import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.JsonNode;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.ssafy.chorongddara.api.response.QuizRes;
import com.ssafy.chorongddara.api.service.QuizService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.*;
import org.springframework.web.bind.annotation.GetMapping;
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
    public String getQuiz() throws JsonProcessingException {
        String apiKey = "API KEY";
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
        message.put("content", preText + "사실에 기반해서 JSON 형태로 경주에 있는 첨성대 관련해서 4지선다로 문제 3개만 랜덤하게 알려줘 그리고 해설도 알려줘");
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

        String[] lines = completedText.split("\r?\n|\r");
        StringBuilder jsonStr = new StringBuilder();
        for (String line : lines ){
            if (line.isEmpty()){
                System.out.println("공백" + line);
            } else {
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

        System.out.println(completedText);

        for (QuizRes quiz : quizzes){
            System.out.println(quiz.getQuestion());

            for (String option : quiz.getOptions()){
                System.out.println(option);
            }
            System.out.println(quiz.getAnswer());
            System.out.println(quiz.getExplanation());
        }

        return "test";
    }

}