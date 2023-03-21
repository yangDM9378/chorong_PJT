package com.ssafy.chorongddara.api.service;

import com.ssafy.chorongddara.api.request.StarUpdateReq;
import com.ssafy.chorongddara.db.entity.CulturalProperty;
import com.ssafy.chorongddara.db.entity.Stage;

import java.util.List;

public interface CulturalPropertyService {
    List<Stage> getStageList();
    List<CulturalProperty> getCulturalPropertyList(int stageId);
    CulturalProperty getCulturalProperty(int culturalPropertyId);

    void updateStar(StarUpdateReq starUpdateReq, int userId);
}
