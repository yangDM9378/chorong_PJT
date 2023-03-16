package com.ssafy.chorongddara.api.controller;

import com.ssafy.chorongddara.api.service.CulturalPropertyService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/cultural-properties")
public class CulturalPropertyController {

    @Autowired
    private CulturalPropertyService culturalPropertyService;


}
