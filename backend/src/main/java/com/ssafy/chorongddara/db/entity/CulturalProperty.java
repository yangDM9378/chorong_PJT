package com.ssafy.chorongddara.db.entity;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

import javax.persistence.*;

@Entity
@Builder
@AllArgsConstructor
@NoArgsConstructor
@Getter
public class CulturalProperty {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer culturalPropertyId;

    @Column(nullable = false,length = 50)
    private String nameKo;

    @Column(length = 50)
    private String nameCh;

    @Column(nullable = false)
    private Double latitude;

    @Column(nullable = false)
    private Double longitude;

    @Column(nullable = false)
    private String address;

    private String description;

    private String hiddenDescription;

    private String image;

    private String type;
}
