package com.ssafy.chorongddara.api.service;

import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.JsonNode;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.ssafy.chorongddara.api.response.QuizRes;
import com.ssafy.chorongddara.db.entity.CulturalProperty;
import com.ssafy.chorongddara.db.entity.Quiz;
import com.ssafy.chorongddara.db.repository.QuizRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.*;
import org.springframework.stereotype.Service;
import org.springframework.web.client.RestTemplate;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

@Service
public class QuizServiceImpl implements QuizService {

    @Autowired
    private QuizRepository quizRepository;

    @Value("${chatgpt.key}")
    private String apiKey;

    @Override
    public List<QuizRes> getQuiz(Integer culturalPropertyId) {
        List<Quiz> quizList = quizRepository.findByCulturalProperty_CulturalPropertyId(culturalPropertyId);

        List<QuizRes> quizResList = new ArrayList<>();
        for(Quiz quiz : quizList) {
            List<String> options = new ArrayList<>();

            options.add(quiz.getOptionOne());
            options.add(quiz.getOptionTwo());
            options.add(quiz.getOptionThree());
            options.add(quiz.getOptionFour());

            QuizRes quizRes = QuizRes.builder()
                    .question(quiz.getQuestion())
                    .options(options)
                    .answer(quiz.getAnswer())
                    .explanation(quiz.getExplaination())
                    .build();

            quizResList.add(quizRes);
        }

        return quizResList;
    }

    public void saveQuiz(CulturalProperty culturalProperty) throws JsonProcessingException {
        // JSON 데이터를 맵 형태로 생성
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
        message.put("content", preText + "사실에 기반해서 JSON 형태로"+ culturalProperty.getAddress() +"에 있는"+ culturalProperty.getNameKo() + " 관련해서 4지선다로 문제 3개만 랜덤하게 알려줘 그리고 해설도 알려줘");
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

        for (JsonNode question : resultQuestions){
            QuizRes quizRes = objectMapper.treeToValue(question, QuizRes.class);

            Quiz quiz = Quiz.builder()
                    .culturalProperty(culturalProperty)
                    .question(quizRes.getQuestion())
                    .optionOne(quizRes.getOptions().get(0))
                    .optionTwo(quizRes.getOptions().get(1))
                    .optionThree(quizRes.getOptions().get(2))
                    .optionFour(quizRes.getOptions().get(3))
                    .answer(quizRes.getAnswer())
                    .explaination(quizRes.getExplanation())
                    .build();

            quizRepository.save(quiz);
        }
    }

    @Override
    public void deleteQuiz(Integer culturalPropertyId) {
        quizRepository.deleteByCulturalProperty_CulturalPropertyId(culturalPropertyId);
    }
}
