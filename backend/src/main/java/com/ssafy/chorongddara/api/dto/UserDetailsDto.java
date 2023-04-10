package com.ssafy.chorongddara.api.dto;

import com.ssafy.chorongddara.db.entity.User;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.extern.slf4j.Slf4j;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.oauth2.core.user.OAuth2User;

import java.util.Collection;
import java.util.Collections;
import java.util.List;
import java.util.Map;

@Slf4j
@Getter
@AllArgsConstructor
public class UserDetailsDto implements OAuth2User, UserDetails {

    private User user;

    private Map<String, Object> attributes;

    private Collection<? extends GrantedAuthority> authorities;

    public UserDetailsDto(User user, List<GrantedAuthority> authorities) {
        this.user = user;
        this.authorities = authorities;
    }

    public static UserDetailsDto create(User user) {
        List<GrantedAuthority> authorities = Collections.
                singletonList(new SimpleGrantedAuthority(user.getEmail()));
        return new UserDetailsDto(user, authorities);
    }

    @Override
    public Map<String, Object> getAttributes() {
        return attributes;
    }

    @Override
    public String getName() {
        return user.getEmail();
    }

    @Override
    public Collection<? extends GrantedAuthority> getAuthorities() {
        return authorities;
    }

    @Override
    public String getPassword() { return user.getPassword(); }

    // userId 자리라서 email 씀
    @Override
    public String getUsername() {
        return user.getEmail();
    }

    @Override
    public boolean isAccountNonExpired() {
        return false;
    }

    @Override
    public boolean isAccountNonLocked() {
        return false;
    }

    @Override
    public boolean isCredentialsNonExpired() {
        return false;
    }

    @Override
    public boolean isEnabled() {
        return false;
    }


}
