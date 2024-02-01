package com.manageformation.services;

import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.manageformation.entities.Formation;
import com.manageformation.entities.Individu;
import com.manageformation.entities.Team;
import com.manageformation.repositories.FormationRepository;
import com.manageformation.repositories.IndividuRepository;
import com.manageformation.repositories.TeamRepository;

@Service
public class IndividuService {
	    @Autowired
	    private IndividuRepository individuRepository;
	    @Autowired
	    private TeamRepository teamRepository;
	    @Autowired
	    private FormationRepository formationRepository;
	    
	    public List<Individu> getAllIndividus() {
	        return individuRepository.findAll();
	    }

	    public String deleteIndividu(int id) {
	    	individuRepository.deleteById(id);
			return "Individu deleted";
	    }
	    public Individu registration(Individu individuInfo,int formation_id) {
	    	  Optional<Formation> formation = formationRepository.findById(formation_id);
	    	  Team team = getOrCreateTeam(formation.get());
	    	  individuInfo.setTeam(team);
	    	  individuInfo.setFormation(formation.get());
	        return individuRepository.save(individuInfo);
	    }
	    private Team getOrCreateTeam(Formation formation) {
	        List<Team> existingTeams = formation.getTeams();
	        if (existingTeams == null || existingTeams.isEmpty()) {
	            return createNewTeam(formation);
	        }
	        Team currentTeam = existingTeams.get(existingTeams.size() - 1);
	        if (currentTeam.getInscrits().size() >= formation.getTeam_seuil()) {
	            return createNewTeam(formation);
	        }
	        return currentTeam;
	    }

	    private Team createNewTeam(Formation formation) {
	        Team newTeam = new Team();
	        newTeam.setFormation(formation);
	        return teamRepository.save(newTeam);
	    }
	    public long countIndividu() {
	        return individuRepository.count();
	    }
		public List<Individu> findbyTeam(int teamid){
			 Optional<Team> team = teamRepository.findById(teamid);
			return individuRepository.findByTeam(team.get()); 
		}
}
