package com.ssafy.chorongddara.api.response;

import com.ssafy.chorongddara.db.entity.CulturalProperty;
import lombok.Builder;
import lombok.Getter;

@Getter
@Builder
public class CulturalPropertyDetailRes {
    CulturalProperty culturalProperty;
    StarCountRes starCountRes;
}
