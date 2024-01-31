package com.manageformation.repositories;

import java.time.LocalDate;
import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.manageformation.entities.Formation;
@Repository
public interface FormationRepository extends JpaRepository<Formation, Integer>{
    List<Formation> findByCategory(String category);
    List<Formation> findByCity(String city);
    List<Formation> findByDate(LocalDate date);
    
}
