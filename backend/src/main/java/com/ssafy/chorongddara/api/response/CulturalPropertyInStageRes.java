package com.ssafy.chorongddara.api.response;

import lombok.Builder;
import lombok.Getter;

@Builder
@Getter
public class CulturalPropertyInStageRes {
    private Integer culturalPropertyId;
    private String nameKo;
    private Double latitude;
    private Double longitude;
    private String pinImage;
    private Integer starCount;
}
