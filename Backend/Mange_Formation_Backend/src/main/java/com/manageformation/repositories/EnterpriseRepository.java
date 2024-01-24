package com.manageformation.repositories;

import org.springframework.data.jpa.repository.JpaRepository;
import com.manageformation.entities.Enterprise;
public interface EnterpriseRepository extends JpaRepository<Enterprise, Integer>{


}