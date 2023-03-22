package com.ssafy.chorongddara.api.service;

import com.ssafy.chorongddara.api.request.UserJoinReq;
import com.ssafy.chorongddara.api.request.UserUpdateReq;
import com.ssafy.chorongddara.common.codes.ErrorCode;
import com.ssafy.chorongddara.common.exception.BusinessExceptionHandler;
import com.ssafy.chorongddara.db.entity.User;
import com.ssafy.chorongddara.db.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

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

    // 트랜잭션 어노테이션 건 상태에서 수정 일어나면 더티체킹으로 트랜잭션 종료시 자동 commit (save 안해도됌)
    @Transactional
    @Override
    public int updateUser(String email, UserUpdateReq userUpdateReq) {
        // 여기서 에러날때 0 반환 / 예외처리 던짐 중 하나 선택해야함
        User user = userRepository.findByEmail(email).orElseThrow(()->new BusinessExceptionHandler("수정할 유저가 없습니다.", ErrorCode.BUSINESS_EXCEPTION_ERROR));
        user.setNickname(userUpdateReq.getNickname());
        user.setPassword(passwordEncoder.encode(userUpdateReq.getPassword()));
        return 1;
    }
}
