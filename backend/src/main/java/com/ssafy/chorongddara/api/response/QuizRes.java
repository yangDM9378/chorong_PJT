package com.ssafy.chorongddara.api.response;

import lombok.Getter;
import lombok.Setter;

import java.util.List;

@Getter
@Setter
public class QuizRes {
    private String question;
    private List<String> options;
    private String answer;
    private String explanation;
}
