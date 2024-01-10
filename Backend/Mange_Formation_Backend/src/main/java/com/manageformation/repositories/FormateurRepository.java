package com.manageformation.repositories;

import org.springframework.data.jpa.repository.JpaRepository;
import com.manageformation.entities.Formateur;

public interface FormateurRepository extends JpaRepository<Formateur, Integer> { 

}
