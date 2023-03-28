package com.ssafy.chorongddara.api.service;

import com.ssafy.chorongddara.api.request.StarUpdateReq;
import com.ssafy.chorongddara.api.response.CulturalPropertyDetailRes;
import com.ssafy.chorongddara.api.response.CulturalPropertyInStageRes;
import com.ssafy.chorongddara.api.response.StageListRes;
import com.ssafy.chorongddara.api.response.StarCountRes;
import com.ssafy.chorongddara.common.codes.ErrorCode;
import com.ssafy.chorongddara.common.exception.BusinessExceptionHandler;
import com.ssafy.chorongddara.db.entity.*;
import com.ssafy.chorongddara.db.repository.*;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.ArrayList;
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
        List<StageListRes> stageList = new ArrayList<>();

        List<Stage> stages = stageRepository.findAll();

        for(int i = 0; i < stages.size(); i++) {
            Optional<UserStage> userStage = userStageRepository.findByUser_UserIdAndStage_StageId(userId, stages.get(i).getStageId());

            if(userStage.isPresent()) {
                stageList.add(new StageListRes(stages.get(i), userStage.get().getStarCount()));
            } else {
                stageList.add(new StageListRes(stages.get(i), 0));
            }
        }

        return stageList;
    }

    @Override
    public List<CulturalPropertyInStageRes> getCulturalPropertyList(Integer userId, Integer stageId) {
        List<CulturalPropertyInStageRes> list = new ArrayList<>();

        List<CulturalProperty> culturalProperties = culturalPropertyRepository.findAllByStage_StageId(stageId);

        for(int i = 0; i < culturalProperties.size(); i++) {
            CulturalProperty culturalProperty = culturalProperties.get(i);

            Integer starCount = starRepository.getStarCount(userId, culturalProperty.getCulturalPropertyId());

            if(starCount == null) {
                starCount = 0;
            }

            list.add(CulturalPropertyInStageRes.builder()
                    .culturalPropertyId(culturalProperty.getCulturalPropertyId())
                    .nameKo(culturalProperty.getNameKo())
                    .latitude(culturalProperty.getLatitude())
                    .longitude(culturalProperty.getLongitude())
                    .pinImage(culturalProperty.getPinImage())
                    .starCount(starCount)
                    .build());
        }

        return list;
    }

    @Override
    public CulturalPropertyDetailRes getCulturalProperty(Integer userId,Integer culturalPropertyId) {
        CulturalProperty culturalProperty = culturalPropertyRepository.findCulturalPropertyByCulturalPropertyId(culturalPropertyId)
                .orElseThrow(() -> new BusinessExceptionHandler("조회할 문화재가 없습니다.", ErrorCode.BUSINESS_EXCEPTION_ERROR));

        System.out.println(culturalProperty);

        Star star = starRepository.findByCulturalProperty_CulturalPropertyIdAndUser_UserId(culturalPropertyId, userId)
                .orElse(Star.builder()
                        .starPose(0)
                        .starQuiz(0)
                        .starAr(0)
                        .build());

        StarCountRes starCountRes = StarCountRes.builder()
                .starPose(star.getStarPose())
                .starQuiz(star.getStarQuiz())
                .starAr(star.getStarAr())
                .build();

        return CulturalPropertyDetailRes.builder()
                .culturalProperty(culturalProperty)
                .starCountRes(starCountRes)
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

        if (starType.equals("pose")) {
            star.completePose();
        } else if (starType.equals("quiz")) {
            star.completeQuiz();
        } else if (starType.equals("ar")) {
            star.completeAr();
        }

        starRepository.save(star);

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

        userStageRepository.save(userStage);
    }
}
