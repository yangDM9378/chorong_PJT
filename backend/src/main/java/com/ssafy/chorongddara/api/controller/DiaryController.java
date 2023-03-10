package com.ssafy.chorongddara.api.controller;

import com.ssafy.chorongddara.api.service.DiaryService;
import com.ssafy.chorongddara.api.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;

@Controller
public class DiaryController {

    @Autowired
    private DiaryService diaryService;

    
}
