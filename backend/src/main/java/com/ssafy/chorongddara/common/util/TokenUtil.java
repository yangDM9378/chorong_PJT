package com.ssafy.chorongddara.common.util;

import com.ssafy.chorongddara.api.dto.TokenDto;
import com.ssafy.chorongddara.api.service.UserService;
import com.ssafy.chorongddara.db.entity.User;
import io.jsonwebtoken.*;
import lombok.extern.log4j.Log4j2;
import org.springframework.beans.factory.annotation.Autowired;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;

import javax.crypto.spec.SecretKeySpec;
import javax.xml.bind.DatatypeConverter;
import java.security.Key;
import java.util.*;
import java.util.concurrent.TimeUnit;
import java.util.stream.Collectors;

/**
 * JWT 관련된 토큰 Util
 *
 * @author choe
 * @fileName TokenUtil
 * @since 2022.12.23
 */
@Log4j2
@Service
public class TokenUtil {
    public final static long TOKEN_VALIDATION_SECOND = 1000L * 60 * 60 * 8;
    public final static long REFRESH_TOKEN_VALIDATION_SECOND = 1000L * 60 * 24 * 2;

    final static public String ACCESS_TOKEN_NAME = "access";
    final static public String REFRESH_TOKEN_NAME = "refresh";

    @Value("${spring.jwt.accessSecret}")
    private String ACCESS_TOKEN_SECRET_KEY;
    @Value("${spring.jwt.refreshSecret}")
    private String REFRESH_TOKEN_SECRET_KEY;

    public static UserService userService;

    @Autowired
    public TokenUtil(UserService userService) {
        this.userService = userService;
    }

    public String generateAccessToken(User user) {
        return generateJwtToken(user, TOKEN_VALIDATION_SECOND, "access");
    }

    public String generateRefreshToken(User user) {
        return generateJwtToken(user, REFRESH_TOKEN_VALIDATION_SECOND, "refresh");
    }

    /**
     * 사용자 정보를 기반으로 토큰을 생성하여 반환 해주는 메서드
     *
     * @param user User : 사용자 정보
     * @return String : 토큰
     */
    public String generateJwtToken(User user, long expireTime, String type) {
        // 사용자 시퀀스를 기준으로 JWT 토큰을 발급하여 반환해줍니다.
        JwtBuilder builder = Jwts.builder()
                .setHeader(createHeader())                              // Header 구성
                .setClaims(createClaims(user))                       // Payload - Claims 구성
                .setSubject(String.valueOf(user.getEmail()))        // Payload - Subject 구성
                .signWith(SignatureAlgorithm.HS256, createSignature(type))  // Signature 구성
                .setExpiration(createExpiredDate(expireTime));                    // Expired Date 구성
        return builder.compact();
    }

    /**
     * 토큰을 기반으로 사용자 정보를 반환 해주는 메서드
     *
     * @param token String : 토큰
     * @return String : 사용자 정보
     */
    public String parseTokenToUserInfo(String token) {
        return Jwts.parser()
                .setSigningKey(ACCESS_TOKEN_SECRET_KEY)
                .parseClaimsJws(token)
                .getBody()
                .getSubject();
    }

    /*
    // JWT 토큰을 복호화하여 토큰에 들어있는 정보를 꺼내는 메서드
    public Authentication getAuthentication(String accessToken) {
        // 토큰 복호화
        Claims claims = getClaimsFormToken(accessToken, ACCESS_TOKEN_NAME);

        if (claims.get("authorization") == null) {
            throw new RuntimeException("권한 정보가 없는 토큰입니다.");
        }

        // 클레임에서 권한 정보 가져오기
        Collection<? extends GrantedAuthority> authorities =
                Arrays.stream(claims.get("authorization").toString().split(","))
                        .map(SimpleGrantedAuthority::new)
                        .collect(Collectors.toList());

        // UserDetails 객체를 만들어서 Authentication 리턴
        UserDetails principal = new org.springframework.security.core.userdetails.User(claims.getSubject(), "", authorities);
        return new UsernamePasswordAuthenticationToken(principal, "", authorities);
    }
     */

    /**
     * 유효한 토큰인지 확인 해주는 메서드
     *
     * @param token String  : 토큰
     * @return boolean      : 유효한지 여부 반환
     */
    public boolean isValidToken(String token) {
        try {
            System.out.println(token);

            Claims claims = getClaimsFormToken(token);

            String TokenDataFromRedis = RedisUtil.getData(token);

            if(TokenDataFromRedis != null && TokenDataFromRedis.equals("logout")) {
                log.info("로그아웃된 토큰입니다.");
                return false;
            }

            System.out.println(claims.getExpiration());
            log.info("expireTime :" + claims.getExpiration());
            log.info("userId :" + claims.get("userId"));
            log.info("userNm :" + claims.get("userNm"));

            return true;
        } catch (ExpiredJwtException exception) {
            log.error("Token Expired");
            return false;
        } catch (JwtException exception) {
            log.error("Token Tampered");
            return false;
        } catch (NullPointerException exception) {
            log.error("Token is null");
            return false;
        }
    }

    /**
     * Header 내에 토큰을 추출합니다.
     *
     * @param header 헤더
     * @return String
     */
    public String getTokenFromHeader(String header) {
        return header.substring(7);
    }

    public Long getExpiration(String token, String type) {

        if(type.equals(ACCESS_TOKEN_NAME)) {
            // accessToken 남은 유효시간
            Date expiration = Jwts.parserBuilder().setSigningKey(ACCESS_TOKEN_SECRET_KEY).build().parseClaimsJws(token).getBody().getExpiration();
            // 현재 시간
            Long now = new Date().getTime();
            return (expiration.getTime() - now);
        } else {
            // accessToken 남은 유효시간
            Date expiration = Jwts.parserBuilder().setSigningKey(REFRESH_TOKEN_SECRET_KEY).build().parseClaimsJws(token).getBody().getExpiration();
            // 현재 시간
            Long now = new Date().getTime();
            return (expiration.getTime() - now);
        }
    }

    /**
     * 토큰의 만료기간을 지정하는 함수
     *
     * @return Calendar
     */
    private Date createExpiredDate(long expireTime) {
        return new Date(System.currentTimeMillis() + expireTime);
    }

    /**
     * JWT의 "헤더" 값을 생성해주는 메서드
     *
     * @return HashMap<String, Object>
     */
    private Map<String, Object> createHeader() {
        Map<String, Object> header = new HashMap<>();

        header.put("typ", "JWT");
        header.put("alg", "HS256");
        header.put("regDate", System.currentTimeMillis());
        return header;
    }

    /**
     * 사용자 정보를 기반으로 클래임을 생성해주는 메서드
     *
     * @param user User 사용자 정보
     * @return Map<String, Object>
     */
    private Map<String, Object> createClaims(User user) {
        // 공개 클레임에 사용자의 이름과 이메일을 설정하여 정보를 조회할 수 있다.
        Map<String, Object> claims = new HashMap<>();

        log.info("userId :" + user.getEmail());
        log.info("userNm :" + user.getNickname());

        claims.put("userId", user.getEmail());
        claims.put("userNm", user.getNickname());
        return claims;
    }

    /**
     * JWT "서명(Signature)" 발급을 해주는 메서드
     *
     * @return Key
     */
    private Key createSignature(String type) {
        if(type.equals(ACCESS_TOKEN_NAME)) {
            byte[] apiKeySecretBytes = DatatypeConverter.parseBase64Binary(ACCESS_TOKEN_SECRET_KEY);
            return new SecretKeySpec(apiKeySecretBytes, SignatureAlgorithm.HS256.getJcaName());
        } else {
            byte[] apiKeySecretBytes = DatatypeConverter.parseBase64Binary(REFRESH_TOKEN_SECRET_KEY);
            return new SecretKeySpec(apiKeySecretBytes, SignatureAlgorithm.HS256.getJcaName());
        }
    }


    /**
     * 토큰 정보를 기반으로 Claims 정보를 반환받는 메서드
     *
     * @param token : 토큰
     * @return Claims : Claims
     */
    private Claims getClaimsFormToken(String token) {
        try {
            return Jwts.parserBuilder().setSigningKey(DatatypeConverter.parseBase64Binary(ACCESS_TOKEN_SECRET_KEY)).build()
                    .parseClaimsJws(token).getBody();
        } catch (Exception e) {
            log.debug("클레임을 가져오는 중 에러 발생");

            e.printStackTrace();

            return null;
        }
    }

    /**
     * 토큰을 기반으로 사용자 정보를 반환받는 메서드
     *
     * @param token : 토큰
     * @return String : 사용자 아이디
     */
    public String getUserIdFromToken(String token) {
        Claims claims = getClaimsFormToken(token);
        return claims.get("userId").toString();
    }

    /*
    public TokenResponse reissueAtk(AccountResponse accountResponse) throws JsonProcessingException {
        String rtkInRedis = redisDao.getValues(accountResponse.getEmail());
        if (Objects.isNull(rtkInRedis)) throw new ForbiddenException("인증 정보가 만료되었습니다.");
        Subject atkSubject = Subject.atk(
                accountResponse.getAccountId(),
                accountResponse.getEmail(),
                accountResponse.getNickname());
        String atk = createToken(atkSubject, atkLive);
        return new TokenResponse(atk, null);
    }

     */

    public TokenDto reissue(TokenDto tokenDto) {
        /*
         *  accessToken 은 JWT Filter 에서 검증되고 옴
         * */
        String originAccessToken = tokenDto.getAccessToken();
        String originRefreshToken = tokenDto.getRefreshToken();

        // refreshToken 검증
        String refreshTokenFlag = RedisUtil.getData(originRefreshToken);

        log.debug("refreshTokenFlag = {}", refreshTokenFlag);

        //refreshToken 검증하고 상황에 맞는 오류를 내보낸다.
        if (refreshTokenFlag == null) {
            throw new RuntimeException("잘못된 리프레시 토큰"); // 잘못된 리프레시 토큰
        }

        System.out.println(getUserIdFromToken(originAccessToken));

        // 5. 새로운 토큰 생성
        String email = getUserIdFromToken(originAccessToken);

        log.debug(email);

        Optional<User> getUser = userService.getUserByEmail(email);
        User user = getUser.orElseThrow(()->new RuntimeException("잘못된 유저 정보"));
        String newAccessToken = generateAccessToken(user);
        String newRefreshToken = generateRefreshToken(user);
        TokenDto newTokenDto = TokenDto.builder()
                .accessToken(newAccessToken)
                .refreshToken(newRefreshToken)
                .build();

        log.debug("refresh Origin = {}",originRefreshToken);
        log.debug("refresh New = {} ",newRefreshToken);
        // 6. 저장소 정보 업데이트 (dirtyChecking으로 업데이트)
        RedisUtil.setDataExpire(newRefreshToken, user.getEmail(), getExpiration(originRefreshToken, REFRESH_TOKEN_NAME));

        // 토큰 발급
        return newTokenDto;
    }

    public void logout(TokenDto tokenDto) {
        // 1. Access Token 검증
        if (!isValidToken(tokenDto.getAccessToken())) {
            throw new RuntimeException("잘못된 토큰 정보입니다.");
        }

        String refreshToken = RedisUtil.getData(tokenDto.getRefreshToken());

        if(!refreshToken.equals(null)) {
            RedisUtil.deleteData(refreshToken);
        }

        // 4. 해당 Access Token 유효시간 가지고 와서 BlackList 로 저장하기
        Long expiration = getExpiration(tokenDto.getAccessToken(), ACCESS_TOKEN_NAME);
        RedisUtil.setDataExpire(tokenDto.getAccessToken(), "logout", expiration);
    }
}
