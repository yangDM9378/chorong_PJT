package com.ssafy.chorongddara.api.service;

import com.ssafy.chorongddara.api.request.StarUpdateReq;
import com.ssafy.chorongddara.api.response.CulturalPropertyDetailRes;
import com.ssafy.chorongddara.api.response.StageListRes;
import com.ssafy.chorongddara.common.codes.ErrorCode;
import com.ssafy.chorongddara.common.exception.BusinessExceptionHandler;
import com.ssafy.chorongddara.db.entity.*;
import com.ssafy.chorongddara.db.repository.*;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.Optional;

@Service
public class CulturalPropertyServiceImpl implements CulturalPropertyService {

    @Autowired
    private UserRepository userRepository;
    @Autowired
    private CulturalPropertyRepository culturalPropertyRepository;
    @Autowired
    private StageRepository stageRepository;
    @Autowired
    private StarRepository starRepository;
    @Autowired
    private UserStageRepository userStageRepository;
    @Autowired
    private PoseRepository poseRepository;

    @Override
    public List<StageListRes> getStageList(Integer userId) {
        return stageRepository.getStages(userId);
    }

    @Override
    public List<CulturalProperty> getCulturalPropertyList(Integer stageId) {
        return culturalPropertyRepository.findAllByStage_StageId(stageId);
    }

    @Override
    public CulturalPropertyDetailRes getCulturalProperty(Integer userId,Integer culturalPropertyId) {
        CulturalProperty culturalProperty = culturalPropertyRepository.findById(culturalPropertyId)
                .orElseThrow(() -> new BusinessExceptionHandler("조회할 문화재가 없습니다.", ErrorCode.BUSINESS_EXCEPTION_ERROR));

        Integer starCount = starRepository.getStarCount(userId, culturalPropertyId);

        Pose pose = poseRepository.findById(culturalProperty.getPose().getPoseId())
                .orElseThrow(() -> new BusinessExceptionHandler("조회한 문화재에 대한 포즈가 없습니다.", ErrorCode.BUSINESS_EXCEPTION_ERROR));

        return CulturalPropertyDetailRes.builder()
                .culturalProperty(culturalProperty)
                .starCount(starCount)
                .pose(pose)
                .build();
    }

    @Transactional
    @Override
    public void updateStar(StarUpdateReq starUpdateReq, int userId) {
        String starType = starUpdateReq.getStarType();
        int culturalPropertyId = starUpdateReq.getCulturalPropertyId();

        User user = userRepository.findByUserId(userId)
                .orElseThrow(()->new BusinessExceptionHandler("서버 문제입니다.", ErrorCode.BUSINESS_EXCEPTION_ERROR));

        CulturalProperty culturalProperty = culturalPropertyRepository.findCulturalPropertyByCulturalPropertyId(culturalPropertyId)
                .orElseThrow(()->new BusinessExceptionHandler("서버 문제입니다.", ErrorCode.BUSINESS_EXCEPTION_ERROR));

        Star star = starRepository.findByCulturalProperty_CulturalPropertyIdAndUser_UserId(culturalPropertyId, userId)
                .orElse(null);
        if (star == null) {
            star = Star.builder()
                    .starPose(0)
                    .starQuiz(0)
                    .starAr(0)
                    .user(user)
                    .culturalProperty(culturalProperty)
                    .build();
        }

        if (starType == "pose") {
            star.completePose();
        } else if (starType == "quiz") {
            star.completeQuiz();
        } else if (starType == "ar") {
            star.completeAr();
        }

        UserStage userStage = userStageRepository.findByUser_UserIdAndStage_StageId(userId, culturalProperty.getStage().getStageId())
                .orElse(null);

        if(userStage == null) {
            userStage = UserStage.builder()
                    .user(user)
                    .stage(culturalProperty.getStage())
                    .starCount(1)
                    .build();
        } else {
            userStage.increaseStarCount();
        }
    }
}
