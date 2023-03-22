package com.ssafy.chorongddara.api.service;

import com.ssafy.chorongddara.api.request.GalleryCreateReq;
import com.ssafy.chorongddara.common.codes.ErrorCode;
import com.ssafy.chorongddara.common.exception.BusinessExceptionHandler;
import com.ssafy.chorongddara.db.entity.CulturalProperty;
import com.ssafy.chorongddara.db.entity.Gallery;
import com.ssafy.chorongddara.db.entity.Star;
import com.ssafy.chorongddara.db.entity.User;
import com.ssafy.chorongddara.db.repository.CulturalPropertyRepository;
import com.ssafy.chorongddara.db.repository.GalleryRepository;
import com.ssafy.chorongddara.db.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class GalleryServiceImpl implements GalleryService {

    @Autowired
    private GalleryRepository galleryRepository;
    @Autowired
    private UserRepository userRepository;
    @Autowired
    private CulturalPropertyRepository culturalPropertyRepository;

    @Override
    public void makeGallery(GalleryCreateReq galleryCreateReq, Integer userId) {

        User user = userRepository.findByUserId(userId)
                .orElseThrow(()->new BusinessExceptionHandler("서버 문제입니다.", ErrorCode.BUSINESS_EXCEPTION_ERROR));

        CulturalProperty culturalProperty = culturalPropertyRepository.findCulturalPropertyByCulturalPropertyId(galleryCreateReq.getCulturalPropertyId())
                .orElseThrow(()->new BusinessExceptionHandler("서버 문제입니다.", ErrorCode.BUSINESS_EXCEPTION_ERROR));

        Gallery gallery = Gallery.builder()
                .picture(galleryCreateReq.getPicture())
                .user(user)
                .culturalProperty(culturalProperty)
                .build();

        galleryRepository.save(gallery);
    }
}
