package com.ssafy.chorongddara.api.response;

import lombok.Getter;
import lombok.Setter;

import java.util.List;

@Getter
@Setter
public class StageListRes {
    private Integer stageId;
    private String characterImage;
    private String description;
    private String stageImage;
    private String stageName;
    private Integer targetStarCount;
    private Integer starCount;
}
