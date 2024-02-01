package com.manageformation.repositories;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import com.manageformation.entities.Formateur;

@Repository
public interface FormateurRepository extends JpaRepository<Formateur, Integer> { 
	List<Formateur> findByAcceptedFalse();
}
