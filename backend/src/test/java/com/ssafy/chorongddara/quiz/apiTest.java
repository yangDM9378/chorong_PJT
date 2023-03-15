package com.ssafy.chorongddara.quiz;

import com.ssafy.chorongddara.api.controller.QuizController;
import com.ssafy.chorongddara.api.service.QuizService;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.Mockito;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.WebMvcTest;
import org.springframework.boot.test.mock.mockito.MockBean;
import org.springframework.security.test.context.support.WithMockUser;
import org.springframework.test.context.junit.jupiter.SpringExtension;
import org.springframework.test.web.servlet.MockMvc;

import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.get;
import static org.springframework.test.web.servlet.result.MockMvcResultHandlers.print;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.status;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.content;

@ExtendWith(SpringExtension.class)
@WebMvcTest(controllers = QuizController.class)
public class apiTest {

    @Autowired
    private MockMvc mvc;

    @MockBean
    private QuizService quizService;

    @Test
    @WithMockUser
    public void test가_리턴된다() throws Exception {
        String test = "test";

        mvc.perform(get("/api/v1/quiz/광주/첨성대"))
                .andDo(print())
                .andExpect(status().isOk())
                .andExpect(content().string(test));
    }
}
