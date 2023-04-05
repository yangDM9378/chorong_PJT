package com.ssafy.chorongddara.db.repository;

import com.ssafy.chorongddara.db.entity.Quiz;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface QuizRepository extends JpaRepository<Quiz, Long> {
    Integer deleteByCulturalProperty_CulturalPropertyId(Integer culturalPropertyId);

    List<Quiz> findByCulturalProperty_CulturalPropertyId(Integer culturalPropertyId);
}
