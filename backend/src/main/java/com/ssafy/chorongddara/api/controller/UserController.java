package com.ssafy.chorongddara.api.controller;

import com.ssafy.chorongddara.api.request.UserJoinReq;
import com.ssafy.chorongddara.api.request.UserUpdateReq;
import com.ssafy.chorongddara.api.service.UserService;
import com.ssafy.chorongddara.common.codes.SuccessCode;
import com.ssafy.chorongddara.common.model.response.BaseResponseBody;
import com.ssafy.chorongddara.common.response.ApiResponse;
import com.ssafy.chorongddara.common.util.TokenUtil;
import com.ssafy.chorongddara.db.entity.User;
import org.apache.tomcat.util.net.openssl.ciphers.Authentication;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/users")
public class UserController {

    @Autowired
    private UserService userService;

    @Autowired
    private TokenUtil tokenUtil;

    @PostMapping("/join")
    public ResponseEntity<ApiResponse<Object>> join(@RequestBody UserJoinReq userJoinReq){
        userService.join(userJoinReq);

        ApiResponse<Object> ar = ApiResponse.builder()
                .result(null)
                .resultCode(SuccessCode.INSERT.getStatus())
                .resultMsg(SuccessCode.INSERT.getMessage())
                .build();
        return new ResponseEntity<>(ar, HttpStatus.OK);
    }

    @GetMapping()
    public ResponseEntity<ApiResponse<Object>> getUser(@RequestHeader("Authorization") String accessToken) {

        String token = tokenUtil.getTokenFromHeader(accessToken);

        String email = tokenUtil.getUserIdFromToken(token);

        User user = userService.getUserByEmail(email).orElse(null);

        if (user == null) {
            ApiResponse<Object> ar = ApiResponse.builder()
                    .result(null)
                    .resultCode(HttpStatus.NO_CONTENT.value())
                    .resultMsg("회원이 없습니다.")
                    .build();
            return new ResponseEntity<>(ar, HttpStatus.NO_CONTENT);
        } else {
            ApiResponse<Object> ar = ApiResponse.builder()
                    .result(user)
                    .resultCode(SuccessCode.SELECT.getStatus())
                    .resultMsg("회원이 조회되었습니다.")
                    .build();
            return new ResponseEntity<>(ar, HttpStatus.OK);
        }
    }

    @PutMapping()
    public ResponseEntity<ApiResponse<Object>> updateUser(@RequestHeader("Authorization") String accessToken, @RequestPart(value = "userInfo") UserUpdateReq userUpdateReq) {
        String token = tokenUtil.getTokenFromHeader(accessToken);
        String email = tokenUtil.getUserIdFromToken(token);
        int result = userService.updateUser(email, userUpdateReq);

        if (result == 0) {
            ApiResponse<Object> ar = ApiResponse.builder()
                    .result(null)
                    .resultCode(HttpStatus.NO_CONTENT.value())
                    .resultMsg("회원이 없습니다.")
                    .build();
            return new ResponseEntity<>(ar, HttpStatus.NO_CONTENT);
        } else {
            ApiResponse<Object> ar = ApiResponse.builder()
                    .result(null)
                    .resultCode(SuccessCode.UPDATE.getStatus())
                    .resultMsg("회원이 수정되었습니다.")
                    .build();
            return new ResponseEntity<>(ar, HttpStatus.OK);
        }
    }
}
