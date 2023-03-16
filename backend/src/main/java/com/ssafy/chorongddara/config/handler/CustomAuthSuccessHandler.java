package com.ssafy.chorongddara.config.handler;

import com.ssafy.chorongddara.api.dto.UserDetailsDto;
import com.ssafy.chorongddara.common.util.ConvertUtil;
import com.ssafy.chorongddara.common.util.RedisUtil;
import com.ssafy.chorongddara.common.util.TokenUtil;
import com.ssafy.chorongddara.db.entity.User;
import lombok.extern.slf4j.Slf4j;
import org.json.simple.JSONObject;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.core.Authentication;
import org.springframework.security.web.authentication.SavedRequestAwareAuthenticationSuccessHandler;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.io.IOException;
import java.io.PrintWriter;
import java.util.HashMap;

/**
 * 사용자의 ‘인증’에 대해 성공하였을 경우 수행되는 Handler로 성공에 대한 사용자에게 반환값을 구성하여 전달합니다
 */
@Slf4j
@Configuration
public class CustomAuthSuccessHandler extends SavedRequestAwareAuthenticationSuccessHandler {

    @Autowired
    TokenUtil tokenUtil;

    @Override
    public void onAuthenticationSuccess(HttpServletRequest request, HttpServletResponse response,
                                        Authentication authentication) throws IOException {
        log.debug("3.CustomLoginSuccessHandler");

        // [STEP1] 사용자와 관련된 정보를 모두 조회합니다.
        User user = ((UserDetailsDto) authentication.getPrincipal()).getUser();

        // [STEP2] 조회한 데이터를 JSONObject 형태로 파싱을 수행합니다.
        JSONObject userVoObj = (JSONObject) ConvertUtil.convertObjectToJsonObject(user);

        HashMap<String, Object> responseMap = new HashMap<>();

        JSONObject jsonObject;

//        // [STEP3-1] 사용자의 상태가 '휴면 상태' 인 경우 응답 값으로 전달 할 데이터
//        if (user.getState() != null && user.getState().equals("D")) {
//            responseMap.put("userInfo", userVoObj);
//            responseMap.put("resultCode", 9001);
//            responseMap.put("token", null);
//            responseMap.put("failMsg", "휴면 계정입니다.");
//            jsonObject = new JSONObject(responseMap);
//        }
//
//        // [STEP3-2] 사용자의 상태가 '휴면 상태'가 아닌 경우 응답 값으로 전달 할 데이터
//        else {
//            // 1. 일반 계정일 경우 데이터 세팅
//            responseMap.put("resultCode", 200);
//            responseMap.put("failMsg", null);
//            jsonObject = new JSONObject(responseMap);
//
//            String accessToken = tokenUtil.generateJwtToken(user, TokenUtil.TOKEN_VALIDATION_SECOND, TokenUtil.ACCESS_TOKEN_NAME);
//            jsonObject.put("accessToken", accessToken);
//            String refreshToken = tokenUtil.generateJwtToken(user, TokenUtil.REFRESH_TOKEN_VALIDATION_SECOND, TokenUtil.REFRESH_TOKEN_NAME);
//            jsonObject.put("refreshToken", refreshToken);
//            jsonObject.put("userName", user.getName());
//
//            RedisUtil.setDataExpire(refreshToken, user.getId(), TokenUtil.REFRESH_TOKEN_VALIDATION_SECOND);
//        }

        // 사용자의 상태가 '휴면 상태'가 아닌 경우 응답 값으로 전달 할 데이터

        // 1. 일반 계정일 경우 데이터 세팅
        responseMap.put("resultCode", 200);
        responseMap.put("failMsg", null);
        jsonObject = new JSONObject(responseMap);

        String accessToken = tokenUtil.generateJwtToken(user, TokenUtil.TOKEN_VALIDATION_SECOND, TokenUtil.ACCESS_TOKEN_NAME);
        jsonObject.put("accessToken", accessToken);
        String refreshToken = tokenUtil.generateJwtToken(user, TokenUtil.REFRESH_TOKEN_VALIDATION_SECOND, TokenUtil.REFRESH_TOKEN_NAME);
        jsonObject.put("refreshToken", refreshToken);
        jsonObject.put("userName", user.getNickname());

        RedisUtil.setDataExpire(refreshToken, user.getEmail(), TokenUtil.REFRESH_TOKEN_VALIDATION_SECOND);


        // [STEP4] 구성한 응답 값을 전달합니다.
        response.setCharacterEncoding("UTF-8");
        response.setContentType("application/json");
        PrintWriter printWriter = response.getWriter();
        printWriter.print(jsonObject);  // 최종 저장된 '사용자 정보', '사이트 정보' Front 전달
        printWriter.flush();
        printWriter.close();
    }
}