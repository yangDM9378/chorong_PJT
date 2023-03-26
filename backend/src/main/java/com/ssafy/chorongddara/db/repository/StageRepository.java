package com.ssafy.chorongddara.db.repository;

import com.ssafy.chorongddara.db.entity.Stage;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface StageRepository extends JpaRepository<Stage, Integer> {
}
