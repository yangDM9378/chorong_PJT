package com.ssafy.chorongddara.api.request;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class UserJoinReq {
    private String email;
    private String nickname;
    private String password;
}
