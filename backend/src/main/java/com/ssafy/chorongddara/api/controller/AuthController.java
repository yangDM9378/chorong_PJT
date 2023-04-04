package com.ssafy.chorongddara.api.controller;

import com.ssafy.chorongddara.api.dto.TokenDto;
import com.ssafy.chorongddara.api.request.UserJoinReq;
import com.ssafy.chorongddara.api.request.UserUpdateReq;
import com.ssafy.chorongddara.api.service.AuthService;
import com.ssafy.chorongddara.api.service.UserService;
import com.ssafy.chorongddara.common.codes.SuccessCode;
import com.ssafy.chorongddara.common.response.ApiResponse;
import com.ssafy.chorongddara.common.util.TokenUtil;
import com.ssafy.chorongddara.db.entity.User;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@CrossOrigin(origins = "*")
@RestController
@RequestMapping("/auth")
public class AuthController {

    @Autowired
    private AuthService authService;

    @PostMapping("/reissue")
    public ResponseEntity<ApiResponse<Object>> join(@RequestBody TokenDto tokenDto){
        TokenDto newTokenDto = authService.reissue(tokenDto);

        ApiResponse<Object> ar = ApiResponse.builder()
                .result(newTokenDto)
                .resultCode(SuccessCode.SEND.getStatus())
                .resultMsg(SuccessCode.SEND.getMessage())
                .build();
        return new ResponseEntity<>(ar, HttpStatus.OK);
    }

}
