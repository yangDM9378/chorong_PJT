package com.ssafy.chorongddara.db.repository;

import com.ssafy.chorongddara.api.response.StageListRes;
import com.ssafy.chorongddara.db.entity.Star;
import io.lettuce.core.dynamic.annotation.Param;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface StageRepository extends JpaRepository<Star, Integer> {
    @Query(value = "SELECT s.*, u.star_count FROM stage s, user_stage u WHERE u.user_id = :userId AND s.stage_id = u.stage_id", nativeQuery = true)
    List<StageListRes> getStages(@Param("userId") Integer userId);
}
