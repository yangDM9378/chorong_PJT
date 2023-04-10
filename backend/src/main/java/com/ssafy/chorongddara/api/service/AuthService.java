package com.ssafy.chorongddara.api.service;

import com.ssafy.chorongddara.api.dto.TokenDto;

public interface AuthService {
    TokenDto reissue(String refreshToken);
}
