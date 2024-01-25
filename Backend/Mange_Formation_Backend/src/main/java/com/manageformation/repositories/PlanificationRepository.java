package com.manageformation.repositories;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import com.manageformation.entities.Planification;

@Repository
public interface PlanificationRepository extends JpaRepository<Planification, Integer> {

}
