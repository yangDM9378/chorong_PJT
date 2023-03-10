package com.ssafy.chorongddara.api.service;

import com.ssafy.chorongddara.db.repository.DiaryRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class DiaryService {

    @Autowired
    private DiaryRepository diaryRepository;

}
