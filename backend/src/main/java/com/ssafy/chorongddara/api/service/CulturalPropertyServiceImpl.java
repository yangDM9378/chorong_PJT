package com.ssafy.chorongddara.api.service;

import com.ssafy.chorongddara.api.request.StarUpdateReq;
import com.ssafy.chorongddara.common.codes.ErrorCode;
import com.ssafy.chorongddara.common.exception.BusinessExceptionHandler;
import com.ssafy.chorongddara.db.entity.CulturalProperty;
import com.ssafy.chorongddara.db.entity.Stage;
import com.ssafy.chorongddara.db.entity.Star;
import com.ssafy.chorongddara.db.repository.CulturalPropertyRepository;
import com.ssafy.chorongddara.db.repository.StageRepository;
import com.ssafy.chorongddara.db.repository.StarRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.Optional;

@Service
public class CulturalPropertyServiceImpl implements CulturalPropertyService {

    @Autowired
    private CulturalPropertyRepository culturalPropertyRepository;

    @Autowired
    private StageRepository stageRepository;
    @Autowired
    private StarRepository starRepository;

    @Override
    public List<Stage> getStageList() {
        return stageRepository.findAll();
    }

    @Override
    public List<CulturalProperty> getCulturalPropertyList(int stageId) {
        return culturalPropertyRepository.findAllByStage_StageId(stageId);
    }

    @Override
    public CulturalProperty getCulturalProperty(int culturalPropertyId) {
        return culturalPropertyRepository.findById(culturalPropertyId)
                .orElseThrow(() -> new BusinessExceptionHandler("조회할 문화재가 없습니다.", ErrorCode.BUSINESS_EXCEPTION_ERROR));
    }

    @Transactional
    @Override
    public void updateStar(StarUpdateReq starUpdateReq, int userId) {
        String starType = starUpdateReq.getStarType();
        int culturalPropertyId = starUpdateReq.getCulturalPropertyId();
        Star star = starRepository.findByCulturalProperty_CulturalPropertyIdAndUser_UserId(culturalPropertyId, userId)
                .orElseThrow(()->new BusinessExceptionHandler("서버 문제입니다.", ErrorCode.BUSINESS_EXCEPTION_ERROR));
        if(starType == "pose") {
            star.setStarPose(1);
        } else if (starType == "quiz") {
            star.setStarQuiz(1);
        } else if (starType == "ar"){
            star.setStarAr(1);
        }

        // 별 모두 채워졌으면 업적?
        if(star.getStarPose() == 1 && star.getStarQuiz() == 1 && star.getStarAr() == 1){
            
        }
    }
}
