package com.ssafy.chorongddara.api.response;

import com.ssafy.chorongddara.db.entity.CulturalProperty;
import com.ssafy.chorongddara.db.entity.Pose;
import com.ssafy.chorongddara.db.entity.Stage;
import lombok.Builder;
import lombok.Getter;
import lombok.Setter;

import javax.persistence.*;

@Getter
@Builder
public class CulturalPropertyDetailRes {
//    private Integer culturalPropertyId;
//    private String nameKo;
//    private String nameCh;
//    private Double latitude;
//    private Double longitude;
//    private String address;
//    private String description;
//    private String hiddenDescription;
//    private String image;
//    private String pinImage;
//    private Stage stage;
//    private Pose pose;
    CulturalProperty culturalProperty;
    Integer starCount;
    Pose pose;
}
