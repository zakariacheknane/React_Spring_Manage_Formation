package com.manageformation.repositories;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.manageformation.entities.Formation;
@Repository
public interface FormationRepository extends JpaRepository<Formation, Integer>{

}
