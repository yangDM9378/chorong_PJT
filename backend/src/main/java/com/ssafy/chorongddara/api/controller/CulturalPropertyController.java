package com.ssafy.chorongddara.api.controller;

import com.ssafy.chorongddara.api.request.StarUpdateReq;
import com.ssafy.chorongddara.api.response.CulturalPropertyDetailRes;
import com.ssafy.chorongddara.api.response.CulturalPropertyInStageRes;
import com.ssafy.chorongddara.api.response.StageListRes;
import com.ssafy.chorongddara.api.service.CulturalPropertyService;
import com.ssafy.chorongddara.api.service.UserService;
import com.ssafy.chorongddara.common.codes.ErrorCode;
import com.ssafy.chorongddara.common.codes.SuccessCode;
import com.ssafy.chorongddara.common.exception.BusinessExceptionHandler;
import com.ssafy.chorongddara.common.response.ApiResponse;
import com.ssafy.chorongddara.common.util.TokenUtil;
import com.ssafy.chorongddara.db.entity.CulturalProperty;
import com.ssafy.chorongddara.db.entity.Stage;
import com.ssafy.chorongddara.db.entity.User;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@CrossOrigin(origins = "*")
@RestController
@RequestMapping("/cultural-properties")
public class CulturalPropertyController {

    @Autowired
    private CulturalPropertyService culturalPropertyService;

    @Autowired
    private UserService userService;

    @Autowired
    private TokenUtil tokenUtil;

    @GetMapping("/stage")
    public ResponseEntity<ApiResponse<Object>> getStageList(@RequestHeader("Authorization") String accessToken) {
        String token = tokenUtil.getTokenFromHeader(accessToken);
        String email = tokenUtil.getUserIdFromToken(token);
        User user = userService.getUserByEmail(email)
                .orElseThrow(()->new BusinessExceptionHandler("유저가 없습니다.", ErrorCode.BUSINESS_EXCEPTION_ERROR));
        int userId = user.getUserId();

        List<StageListRes> stageList = culturalPropertyService.getStageList(userId);

        ApiResponse<Object> ar = ApiResponse.builder()
                .result(stageList)
                .resultCode(SuccessCode.SELECT.getStatus())
                .resultMsg(SuccessCode.SELECT.getMessage())
                .build();
        return new ResponseEntity<>(ar, HttpStatus.OK);
    }

    @GetMapping("/stage/{stage_id}")
    public ResponseEntity<ApiResponse<Object>> getCulturalPropertyList(@PathVariable int stage_id) {

        List<CulturalPropertyInStageRes> culturalPropertyList = culturalPropertyService.getCulturalPropertyList(stage_id);
        ApiResponse<Object> ar = ApiResponse.builder()
                .result(culturalPropertyList)
                .resultCode(SuccessCode.SELECT.getStatus())
                .resultMsg(SuccessCode.SELECT.getMessage())
                .build();
        return new ResponseEntity<>(ar, HttpStatus.OK);
    }

    @GetMapping("/{cultural_property_id}")
    public ResponseEntity<ApiResponse<Object>> getCulturalProperty(@RequestHeader("Authorization") String accessToken, @PathVariable int cultural_property_id) {
        String token = tokenUtil.getTokenFromHeader(accessToken);
        String email = tokenUtil.getUserIdFromToken(token);
        User user = userService.getUserByEmail(email)
                .orElseThrow(()->new BusinessExceptionHandler("유저가 없습니다.", ErrorCode.BUSINESS_EXCEPTION_ERROR));
        int userId = user.getUserId();

        CulturalPropertyDetailRes culturalPropertyDetail = culturalPropertyService.getCulturalProperty(userId, cultural_property_id);

        ApiResponse<Object> ar = ApiResponse.builder()
                .result(culturalPropertyDetail)
                .resultCode(SuccessCode.SELECT.getStatus())
                .resultMsg(SuccessCode.SELECT.getMessage())
                .build();
        return new ResponseEntity<>(ar, HttpStatus.OK);
    }

    @PostMapping("/star")
    public ResponseEntity<ApiResponse<Object>> updateStar(@RequestBody StarUpdateReq starUpdateReq, @RequestHeader("Authorization") String accessToken) {
        String token = tokenUtil.getTokenFromHeader(accessToken);
        String email = tokenUtil.getUserIdFromToken(token);
        User user = userService.getUserByEmail(email)
                .orElseThrow(()->new BusinessExceptionHandler("유저가 없습니다.", ErrorCode.BUSINESS_EXCEPTION_ERROR));
        int userId = user.getUserId();
        culturalPropertyService.updateStar(starUpdateReq, userId);
        ApiResponse<Object> ar = ApiResponse.builder()
                .result(null)
                .resultCode(SuccessCode.UPDATE.getStatus())
                .resultMsg(SuccessCode.UPDATE.getMessage())
                .build();
        return new ResponseEntity<>(ar, HttpStatus.OK);
    }
}
