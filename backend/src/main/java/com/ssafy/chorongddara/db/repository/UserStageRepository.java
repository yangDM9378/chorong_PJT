package com.ssafy.chorongddara.db.repository;

import com.ssafy.chorongddara.db.entity.UserStage;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface UserStageRepository extends JpaRepository<UserStage, Integer> {
    Optional<UserStage> findByUser_UserIdAndStage_StageId(Integer userId, Integer culturalPropertyId);
}
