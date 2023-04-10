package com.ssafy.chorongddara.api.response;

import lombok.*;

import java.util.List;

@Getter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class QuizRes {
    private String question;
    private List<String> options;
    private String answer;
    private String explanation;
}
