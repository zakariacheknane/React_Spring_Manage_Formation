package com.manageformation.repositories;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.manageformation.entities.Formation;
import com.manageformation.entities.Team;
@Repository
public interface TeamRepository extends JpaRepository<Team, Integer>  {
	List<Team> findByFormation(Formation formation);

}

