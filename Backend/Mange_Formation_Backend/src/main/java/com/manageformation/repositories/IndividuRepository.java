package com.manageformation.repositories;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.manageformation.entities.Individu;
import com.manageformation.entities.Team;


@Repository
public interface IndividuRepository extends JpaRepository<Individu, Integer> {
	List<Individu> findByTeam(Team team);
}

