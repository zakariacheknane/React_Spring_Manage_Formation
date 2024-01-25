package com.manageformation.repositories;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.manageformation.entities.Enterprise;
@Repository
public interface EnterpriseRepository extends JpaRepository<Enterprise, Integer>{


}