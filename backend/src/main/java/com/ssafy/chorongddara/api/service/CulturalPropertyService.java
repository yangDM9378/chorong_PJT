package com.ssafy.chorongddara.api.service;

import com.ssafy.chorongddara.db.repository.CulturalPropertyRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class CulturalPropertyService {

    @Autowired
    private CulturalPropertyRepository culturalPropertyRepository;


}
