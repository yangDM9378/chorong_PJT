package com.ssafy.chorongddara.config.oauth2;

import com.ssafy.chorongddara.api.dto.UserDetailsDto;
import com.ssafy.chorongddara.config.oauth2.userinfo.AuthProvider;
import com.ssafy.chorongddara.config.oauth2.userinfo.OAuth2UserInfo;
import com.ssafy.chorongddara.config.oauth2.userinfo.OAuth2UserInfoFactory;
import com.ssafy.chorongddara.db.entity.User;
import com.ssafy.chorongddara.db.repository.UserRepository;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.security.authentication.InternalAuthenticationServiceException;
import org.springframework.security.oauth2.client.userinfo.DefaultOAuth2UserService;
import org.springframework.security.oauth2.client.userinfo.OAuth2UserRequest;
import org.springframework.security.oauth2.core.OAuth2AuthenticationException;
import org.springframework.security.oauth2.core.user.OAuth2User;
import org.springframework.stereotype.Service;

import javax.transaction.Transactional;
import java.util.Optional;
import java.util.UUID;

@Service
@RequiredArgsConstructor
@Slf4j
public class CustomOAuth2UserService extends DefaultOAuth2UserService {

    private final UserRepository userRepository;
    private final static int RANDOM_STRING_SIZE = 10;

    @Override
    public OAuth2User loadUser(OAuth2UserRequest userRequest) throws OAuth2AuthenticationException {
        OAuth2User user = super.loadUser(userRequest);

        try {
            return this.process(userRequest, user);
        } catch (Exception ex) {
            ex.printStackTrace();
            throw new InternalAuthenticationServiceException(ex.getMessage(), ex.getCause());
        }
    }

    private OAuth2User process(OAuth2UserRequest oAuth2UserRequest, OAuth2User oAuth2User) {
        AuthProvider authProvider = AuthProvider.valueOf(oAuth2UserRequest.getClientRegistration().getRegistrationId().toLowerCase());
        String registrationId = authProvider.toString();

        OAuth2UserInfo userInfo = OAuth2UserInfoFactory.getOAuth2UserInfo(registrationId, oAuth2User.getAttributes());
        Optional<User> optionalUser = userRepository.findByEmail(userInfo.getEmail());
        User user;

        if (optionalUser.isPresent()) {
            user = updateUser(optionalUser.get());
        } else {
            user = createUser(userInfo);
        }

        return UserDetailsDto.create(user);
    }

    @Transactional
    User createUser(OAuth2UserInfo userInfo) {
        User user = User.builder()
                .email(userInfo.getEmail())
                .password(UUID.randomUUID().toString())
                .nickname(userInfo.getName())
                .build();

        return userRepository.save(user);
    }

    @Transactional
    User updateUser(User existingUser) {
        return existingUser;
    }
}
