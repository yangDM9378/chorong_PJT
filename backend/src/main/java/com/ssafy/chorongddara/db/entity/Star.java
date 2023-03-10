package com.ssafy.chorongddara.db.entity;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.NoArgsConstructor;
import lombok.Setter;
import org.hibernate.annotations.DynamicUpdate;

import javax.persistence.*;

@Entity
@Builder
@AllArgsConstructor
@NoArgsConstructor
@DynamicUpdate
public class Star {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer starId;

    private Integer starPose;

    private Integer starQuiz;

    private Integer starReview;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "userId")
    private User user;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "culturalPropertyId")
    private CulturalProperty culturalProperty;
}
