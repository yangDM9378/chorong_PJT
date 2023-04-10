package com.ssafy.chorongddara.api.controller;

import com.ssafy.chorongddara.api.dto.TokenDto;
import com.ssafy.chorongddara.api.service.AuthService;
import com.ssafy.chorongddara.common.codes.SuccessCode;
import com.ssafy.chorongddara.common.response.ApiResponse;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import java.util.Map;

@CrossOrigin(origins = "*")
@RestController
@RequestMapping("/auth")
public class AuthController {

    @Autowired
    private AuthService authService;

    @PostMapping("/reissue")
    public ResponseEntity<ApiResponse<Object>> join(@RequestBody Map<String,String> refreshTokenBody){
        String refreshToken = refreshTokenBody.get("refreshToken");

        TokenDto newTokenDto = authService.reissue(refreshToken);

        ApiResponse<Object> ar = ApiResponse.builder()
                .result(newTokenDto)
                .resultCode(SuccessCode.SEND.getStatus())
                .resultMsg(SuccessCode.SEND.getMessage())
                .build();
        return new ResponseEntity<>(ar, HttpStatus.OK);
    }

}
