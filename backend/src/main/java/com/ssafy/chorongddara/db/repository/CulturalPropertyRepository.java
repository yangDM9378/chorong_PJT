package com.ssafy.chorongddara.db.repository;

import com.ssafy.chorongddara.db.entity.CulturalProperty;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface CulturalPropertyRepository extends JpaRepository<CulturalProperty, Integer> {
}
