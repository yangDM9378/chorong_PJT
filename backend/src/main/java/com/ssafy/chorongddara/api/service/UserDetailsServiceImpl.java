package com.ssafy.chorongddara.api.service;

import com.ssafy.chorongddara.api.dto.UserDetailsDto;
import com.ssafy.chorongddara.db.entity.User;
import org.springframework.security.authentication.AuthenticationServiceException;
import org.springframework.security.authentication.BadCredentialsException;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;

import java.util.Collections;

@Service
public class UserDetailsServiceImpl implements UserDetailsService {

    private final UserService userService;

    public UserDetailsServiceImpl(UserService us) {
        this.userService = us;
    }

    @Override
    public UserDetails loadUserByUsername(String id) throws UsernameNotFoundException {
//        User user = User
//                .userBuilder()
//                .id(id)
//                .build();
//
        // 사용자 정보가 존재하지 않는 경우
        if (id == null || id.equals("")) {
            return userService.getUserByEmail(id)
                    .map(u -> new UserDetailsDto(u, Collections.singleton(new SimpleGrantedAuthority(u.getEmail()))))
                    .orElseThrow(() -> new AuthenticationServiceException(id));
        }
        // 비밀번호가 맞지 않는 경우
        else {
            return userService.getUserByEmail(id)
                    .map(u -> new UserDetailsDto(u, Collections.singleton(new SimpleGrantedAuthority(u.getEmail()))))
                    .orElseThrow(() -> new BadCredentialsException(id));
        }
//        return null;
    }
}
