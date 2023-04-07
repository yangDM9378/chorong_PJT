package com.ssafy.chorongddara.api.service;

import com.ssafy.chorongddara.api.request.StarUpdateReq;
import com.ssafy.chorongddara.api.response.CulturalPropertyDetailRes;
import com.ssafy.chorongddara.api.response.CulturalPropertyInStageRes;
import com.ssafy.chorongddara.api.response.StageListRes;

import java.util.List;

public interface CulturalPropertyService {
    List<StageListRes> getStageList(Integer userId);
    List<CulturalPropertyInStageRes> getCulturalPropertyList(Integer userId, Integer stageId);
    CulturalPropertyDetailRes getCulturalProperty(Integer userId, Integer culturalPropertyId);
    void updateStar(StarUpdateReq starUpdateReq, int userId);
}
