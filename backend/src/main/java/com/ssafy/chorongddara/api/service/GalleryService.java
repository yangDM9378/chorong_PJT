package com.ssafy.chorongddara.api.service;

import com.ssafy.chorongddara.api.request.GalleryCreateReq;

public interface GalleryService {
    void makeGallery(GalleryCreateReq galleryCreateReq, Integer userId);
}
