package com.manageformation.repositories;

import org.springframework.data.jpa.repository.JpaRepository;
import com.manageformation.entities.Formation;

public interface FormationRepository extends JpaRepository<Formation, Integer>{

}
