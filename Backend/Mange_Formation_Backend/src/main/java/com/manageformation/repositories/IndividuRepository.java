package com.manageformation.repositories;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import com.manageformation.entities.Individu;

@Repository
public interface IndividuRepository extends JpaRepository<Individu, Integer> {
}

