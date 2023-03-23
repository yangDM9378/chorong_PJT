package com.ssafy.chorongddara.db.repository;

import com.ssafy.chorongddara.db.entity.Star;
import io.lettuce.core.dynamic.annotation.Param;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface StarRepository extends JpaRepository<Star, Integer> {
    Optional<Star> findByCulturalProperty_CulturalPropertyIdAndUser_UserId(int culturalPropertyId, int userId);

    @Query(value = "SELECT star_pose + star_quiz + star_ar AS star_count FROM star WHERE user_id=:userId and cultural_property_id=:culturalPropertyId", nativeQuery = true)
    Integer getStarCount(@Param("userId") Integer userId, @Param("culturalPropertyId") Integer culturalPropertyId);
}
