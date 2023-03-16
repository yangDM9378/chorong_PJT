package com.ssafy.chorongddara.api.service;

import com.ssafy.chorongddara.api.request.UserJoinReq;
import com.ssafy.chorongddara.common.exception.BusinessExceptionHandler;
import com.ssafy.chorongddara.db.entity.User;
import com.ssafy.chorongddara.db.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import java.util.NoSuchElementException;
import java.util.Optional;

@Service
public class UserServiceImpl implements UserService {

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private PasswordEncoder passwordEncoder;

    @Override
    public void join(UserJoinReq userJoinReq) {
        User user = new User();
        user.setEmail(userJoinReq.getEmail());
        user.setPassword(passwordEncoder.encode(userJoinReq.getPassword()));
        user.setNickname(userJoinReq.getNickname());
        userRepository.save(user);
    }

    @Override
    public Optional<User> getUserByEmail(String email) {
        //유저 정보 리턴
        Optional<User> user = userRepository.findByEmail(email);
        return user;
    }
}
