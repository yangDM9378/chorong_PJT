package com.ssafy.chorongddara.api.request;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class UserUpdateReq {
    private String nickname;
    private String password;
}
