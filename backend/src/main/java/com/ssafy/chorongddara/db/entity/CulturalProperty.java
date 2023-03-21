package com.ssafy.chorongddara.db.entity;

import lombok.*;

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

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "stageId")
    private Stage stage;

    public void changeNameKo(String nameKo) {
        this.nameKo = nameKo;
    }

    public void changeNameCh(String nameCh) {
        this.nameCh = nameCh;
    }

    public void changeLatitude(Double latitude) {
        this.latitude = latitude;
    }

    public void changeLongitude(Double longitude) {
        this.longitude = longitude;
    }

    public void changeAddress(String address) {
        this.address = address;
    }

    public void changeDescription(String description) {
        this.description = description;
    }

    public void changeImage(String image) {
        this.image = image;
    }

    public void changeType(String type) {
        this.type = type;
    }
}
