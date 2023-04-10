package com.ssafy.chorongddara.api.service;

import com.ssafy.chorongddara.api.dto.TokenDto;
import com.ssafy.chorongddara.common.util.RedisUtil;
import com.ssafy.chorongddara.common.util.TokenUtil;
import com.ssafy.chorongddara.db.entity.User;
import lombok.extern.log4j.Log4j2;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.Optional;

@Log4j2
@Service
public class AuthServiceImpl implements AuthService {

    @Autowired
    UserService userService;

    @Autowired
    TokenUtil tokenUtil;

    @Autowired
    RedisUtil redisUtil;

    @Override
        public TokenDto reissue(String refreshToken) {
        /*
         *  accessToken 은 JWT Filter 에서 검증되고 옴
         * */
        // refreshToken 검증
        String refreshTokenFlag = redisUtil.getData(refreshToken);

        //refreshToken 검증하고 상황에 맞는 오류를 내보낸다.
        if (refreshTokenFlag == null) {
            throw new RuntimeException("잘못된 리프레시 토큰"); // 잘못된 리프레시 토큰
        }

        // 5. 새로운 토큰 생성
        String email = tokenUtil.getUserIdFromRefreshToken(refreshToken);

        Optional<User> getUser = userService.getUserByEmail(email);
        User user = getUser.orElseThrow(()->new RuntimeException("잘못된 유저 정보"));
        String newAccessToken = tokenUtil.generateAccessToken(user);
        String newRefreshToken = tokenUtil.generateRefreshToken(user);
        TokenDto newTokenDto = TokenDto.builder()
                .accessToken(newAccessToken)
                .refreshToken(newRefreshToken)
                .build();

        // 6. 저장소 정보 업데이트 (dirtyChecking으로 업데이트)
        redisUtil.setDataExpire(newRefreshToken, user.getEmail(), tokenUtil.getExpiration(refreshToken, TokenUtil.REFRESH_TOKEN_NAME));

        // 토큰 발급
        return newTokenDto;
    }
}
