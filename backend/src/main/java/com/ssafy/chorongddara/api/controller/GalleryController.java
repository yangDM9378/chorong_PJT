package com.ssafy.chorongddara.api.controller;

import com.ssafy.chorongddara.api.request.GalleryCreateReq;
import com.ssafy.chorongddara.api.service.GalleryService;
import com.ssafy.chorongddara.common.codes.ErrorCode;
import com.ssafy.chorongddara.common.codes.SuccessCode;
import com.ssafy.chorongddara.common.exception.BusinessExceptionHandler;
import com.ssafy.chorongddara.common.response.ApiResponse;
import com.ssafy.chorongddara.common.util.TokenUtil;
import com.ssafy.chorongddara.db.entity.User;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import static com.ssafy.chorongddara.common.util.TokenUtil.userService;

@RestController
@RequestMapping("/gallerys")
public class GalleryController {

    @Autowired
    private GalleryService galleryService;
    @Autowired
    private TokenUtil tokenUtil;

    @PostMapping("/star")
    public ResponseEntity<ApiResponse<Object>> makeGallery(@RequestBody GalleryCreateReq galleryCreateReq, @RequestHeader("Authorization") String accessToken) {

        String token = tokenUtil.getTokenFromHeader(accessToken);
        String email = tokenUtil.getUserIdFromToken(token);
        User user = userService.getUserByEmail(email)
                .orElseThrow(()->new BusinessExceptionHandler("유저가 없습니다.", ErrorCode.BUSINESS_EXCEPTION_ERROR));
        Integer userId = user.getUserId();
        galleryService.makeGallery(galleryCreateReq, userId);
        ApiResponse<Object> ar = ApiResponse.builder()
                .result(null)
                .resultCode(SuccessCode.INSERT.getStatus())
                .resultMsg(SuccessCode.INSERT.getMessage())
                .build();
        return new ResponseEntity<>(ar, HttpStatus.OK);
    }
}
