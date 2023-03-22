package com.ssafy.chorongddara.api.request;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class GalleryCreateReq {
    private String picture;
    private Integer culturalPropertyId;
}
