package com.ssafy.chorongddara.api.service;

import java.util.List;

public interface GalleryService {
    void makeGallery(Integer culturalPropertyId, String pictureName, Integer userId);

    List<String> getGallery(Integer userId);

    List<String> getGalleryAboutCulturalProperty(Integer userId, Integer culturalPropertyId);
}
