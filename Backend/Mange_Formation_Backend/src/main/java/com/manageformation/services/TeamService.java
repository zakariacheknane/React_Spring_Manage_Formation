package com.manageformation.services;

import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.manageformation.entities.Formation;
import com.manageformation.entities.Team;
import com.manageformation.repositories.FormationRepository;
import com.manageformation.repositories.TeamRepository;
@Service
public class TeamService {
	@Autowired 
	private TeamRepository teamrepo;
	 @Autowired
	  private FormationRepository formationRep;
	public List<Team> getAllTeams(){
		return teamrepo.findAll(); 
	}
	public List<Team> findbyFormation(int formationId){
		 Optional<Formation> formation = formationRep.findById(formationId);
		return teamrepo.findByFormation(formation.get()); 
	}
}
