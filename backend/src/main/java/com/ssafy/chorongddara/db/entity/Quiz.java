package com.ssafy.chorongddara.db.entity;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

import javax.persistence.*;

@Entity
@Getter
@AllArgsConstructor
@NoArgsConstructor
@Builder
public class Quiz {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long quizId;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "cultural_property_id", nullable = false)
    private CulturalProperty culturalProperty;

    @Column(length = 50)
    private String question;

    @Column(length = 100)
    private String optionOne;

    @Column(length = 100)
    private String optionTwo;

    @Column(length = 100)
    private String optionThree;

    @Column(length = 100)
    private String optionFour;

    @Column(length = 100)
    private String answer;

    @Column(length = 400)
    private String explaination;
}
