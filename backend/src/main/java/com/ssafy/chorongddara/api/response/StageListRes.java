package com.ssafy.chorongddara.api.response;

import com.ssafy.chorongddara.db.entity.Stage;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.util.List;

@AllArgsConstructor
@NoArgsConstructor
@Getter
@Setter
public class StageListRes {
    private Stage stage;
    private Integer starCount;
}
