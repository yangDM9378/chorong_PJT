package com.ssafy.chorongddara.api.service;


import com.ssafy.chorongddara.api.request.UserJoinReq;
import com.ssafy.chorongddara.db.entity.User;

public interface UserService {
    void join(UserJoinReq userJoinReq);
    User searchUserByEmail(String email);

}
