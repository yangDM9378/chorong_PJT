package com.ssafy.chorongddara.api.service;

import com.ssafy.chorongddara.common.codes.ErrorCode;
import com.ssafy.chorongddara.common.exception.BusinessExceptionHandler;
import com.ssafy.chorongddara.db.entity.CulturalProperty;
import com.ssafy.chorongddara.db.entity.Gallery;
import com.ssafy.chorongddara.db.entity.User;
import com.ssafy.chorongddara.db.repository.CulturalPropertyRepository;
import com.ssafy.chorongddara.db.repository.GalleryRepository;
import com.ssafy.chorongddara.db.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class GalleryServiceImpl implements GalleryService {

    @Autowired
    private GalleryRepository galleryRepository;
    @Autowired
    private UserRepository userRepository;
    @Autowired
    private CulturalPropertyRepository culturalPropertyRepository;

    @Override
    public void makeGallery(Integer culturalPropertyId, String pictureName, Integer userId) {
        User user = userRepository.findByUserId(userId)
                .orElseThrow(()->new BusinessExceptionHandler("서버 문제입니다.", ErrorCode.BUSINESS_EXCEPTION_ERROR));

        CulturalProperty culturalProperty = culturalPropertyRepository.findCulturalPropertyByCulturalPropertyId(culturalPropertyId)
                .orElseThrow(()->new BusinessExceptionHandler("서버 문제입니다.", ErrorCode.BUSINESS_EXCEPTION_ERROR));

        Gallery gallery = Gallery.builder()
                .picture(pictureName)
                .user(user)
                .culturalProperty(culturalProperty)
                .build();

        galleryRepository.save(gallery);
    }

    @Override
    public List<String> getGallery(Integer userId) {
        List<String> pictureList = galleryRepository.findByUserId(userId);
        return pictureList;
    }
}
