package com.ssafy.chorongddara.api.response;

import lombok.Builder;
import lombok.Getter;

@Getter
@Builder
public class StarCountRes {
    Integer starPose;
    Integer starQuiz;
    Integer starAr;
}
