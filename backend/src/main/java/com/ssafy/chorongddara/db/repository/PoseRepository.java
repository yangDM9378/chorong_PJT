package com.ssafy.chorongddara.db.repository;

import com.ssafy.chorongddara.db.entity.Pose;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface PoseRepository extends JpaRepository<Pose, Integer> {
}
