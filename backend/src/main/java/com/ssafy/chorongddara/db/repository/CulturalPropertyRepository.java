package com.ssafy.chorongddara.db.repository;

import com.ssafy.chorongddara.db.entity.CulturalProperty;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface CulturalPropertyRepository extends JpaRepository<CulturalProperty, Integer> {
    List<CulturalProperty> findAllByStage_StageId(Integer stageId);

    Optional<CulturalProperty> findCulturalPropertyByCulturalPropertyId(Integer culturalPropertyId);
}
