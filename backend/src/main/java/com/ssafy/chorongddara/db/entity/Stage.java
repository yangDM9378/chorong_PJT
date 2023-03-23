package com.ssafy.chorongddara.db.entity;

import lombok.*;

import javax.persistence.*;

@Entity
@Builder
@AllArgsConstructor
@NoArgsConstructor
@Getter
public class Stage {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer stageId;
    @Column(nullable = false)
    private String stageName;
    @Column(nullable = false)
    private String stageImage;
    @Column(nullable = false)
    private String characterImage;
    private String description;
    private Integer targetStarCount;
}
