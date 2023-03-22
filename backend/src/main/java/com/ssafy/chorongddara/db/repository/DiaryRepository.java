package com.ssafy.chorongddara.db.repository;

import com.ssafy.chorongddara.db.entity.Gallery;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface DiaryRepository extends JpaRepository<Gallery, Integer> {
}
