package com.ssafy.chorongddara.api.controller;

import com.ssafy.chorongddara.api.request.UserJoinReq;
import com.ssafy.chorongddara.api.service.UserService;
import com.ssafy.chorongddara.common.model.response.BaseResponseBody;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/users")
public class UserController {

    @Autowired
    private UserService userService;

    @PostMapping("/join")
    public ResponseEntity<? extends BaseResponseBody> join(@RequestBody UserJoinReq userJoinReq){

        return ResponseEntity.status(200).body(BaseResponseBody.of(200, "Success" ));
    }
}
