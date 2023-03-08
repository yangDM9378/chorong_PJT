package com.ssafy.chorongddara.db.entity;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.NoArgsConstructor;
import lombok.Setter;

import javax.persistence.*;

@Entity
@Builder
@AllArgsConstructor
@NoArgsConstructor
@Setter
public class CulturalPropertyAchievement {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer culturalPropertyAchievementId;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "achievementId")
    private Achievement achievement;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "culturalPropertyId")
    private CulturalProperty culturalProperty;
}
