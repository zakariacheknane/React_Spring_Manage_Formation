package com.manageformation.services;

import java.time.LocalDate;
import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.manageformation.entities.Enterprise;
import com.manageformation.entities.Formateur;
import com.manageformation.entities.Formation;
import com.manageformation.entities.Planification;
import com.manageformation.entities.Team;
import com.manageformation.repositories.EnterpriseRepository;
import com.manageformation.repositories.FormateurRepository;
import com.manageformation.repositories.FormationRepository;
import com.manageformation.repositories.PlanificationRepository;
import com.manageformation.repositories.TeamRepository;


@Service
public class PlanificationService {
	  @Autowired
	    private PlanificationRepository planificationRepository;
	  @Autowired
	  private FormationRepository formationRep;
	  @Autowired
	  private EnterpriseRepository enterpriseRep;
	  @Autowired
	    private FormateurRepository  formateurrepo;
	  @Autowired
	  private TeamRepository teamrep;
	    public List<Planification> getAllPlanifications() {
	        return planificationRepository.findAll();
	    }
	    public Planification planifyFormation(LocalDate startDate, LocalDate endDate, int formationId, int formateurId, int entrepriseId,int team_id) {
	        Optional<Formation> formation = formationRep.findById(formationId);
	        Optional<Formateur> formateur = formateurrepo.findById(formateurId);
	        Optional<Enterprise> entreprise = enterpriseRep.findById(entrepriseId);
	        Optional<Team> team = teamrep.findById(team_id);
	            Planification pl = new Planification();
	            pl.setStartDate(startDate);
	            pl.setEndDate(endDate);
	            pl.setFormation(formation.get());
	            pl.setFormateur(formateur.get());
	            pl.setEntreprise(entreprise.get());
	            pl.setGroup(team.get());
	            return planificationRepository.save(pl);
	        }

	    public Planification updatePlanification( Planification updatedPlanification) {
	        return planificationRepository.save(updatedPlanification);
	    }
	    public String deletePlanification(int id) {
	    	planificationRepository.deleteById(id);
			return "Planification deleted";
	    }
}
