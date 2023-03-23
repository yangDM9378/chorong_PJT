package com.ssafy.chorongddara.db.repository;

import com.ssafy.chorongddara.db.entity.Gallery;
import io.lettuce.core.dynamic.annotation.Param;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface GalleryRepository extends JpaRepository<Gallery, Integer> {
    @Query(value = "SELECT picture FROM gallery WHERE user_id=:userId", nativeQuery = true)
    List<String> findByUserId(@Param("userId") Integer userId);
}
