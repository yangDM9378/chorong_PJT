package com.ssafy.chorongddara.db.repository;

import com.ssafy.chorongddara.db.entity.Star;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface StarRepository extends JpaRepository<Star, Integer> {
    Optional<Star> findByCulturalProperty_CulturalPropertyIdAndUser_UserId(int culturalPropertyId, int userId);
}
