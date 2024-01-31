package com.manageformation.services;

import java.time.LocalDate;
import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.manageformation.entities.Enterprise;
import com.manageformation.entities.Formateur;
import com.manageformation.entities.Formation;
import com.manageformation.entities.Individu;
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
	    private IndividuService  individuservice;
	  @Autowired
	  private TeamRepository teamrep;
	  @Autowired
	    MailService emailService;
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
	    public String deletePlanificationEnd() {
			   List<Planification> planifications = planificationRepository.findAll();
			   LocalDate currentDate = LocalDate.now();
			   for (Planification planification : planifications) {
				   LocalDate endDate = planification.getEndDate();
				   if (endDate.isBefore(currentDate)) {
					   List<Individu>  individus= individuservice.findbyTeam(planification.getGroup().getId());
					   for(Individu individu :individus ) {
						   String Subject = "Congratulations on completing the training! 🎉";
						   String  message="Hello " + individu.getFirstName() +" "+individu.getFirstName() + ",\n\n" +
								   "Congratulations on successfully completing your course at Formation Center!\n\n" +
								   "Here are the details of your completed training:\n" +
					                  "Training Name: " + planification.getFormation().getName_formation() + "\n" +
					                  "Completion Date: " + planification.getEndDate() + "\n\n" +
					                  "We trust that you found the training valuable and enriching. Your accomplishment is commendable!\n" +
					                  "To provide additional feedback, please click on the following link:\n" +
					                  "http://localhost:3000/feedback?idIndividu=" + individu.getId() + "&idFormater=" + planification.getFormateur().getId() +
					                  "\n\n" +
					                  "Should you have any further inquiries or feedback, please feel free to reach out to us.\n\n" +
					                  "Thank you for choosing Formation Center for your education. We look forward to serving you in the future.\n\n" +
					                  "Best regards,\n" +
					                  "Formation Center";
						   emailService.sendMail(individu.getEmail(), Subject, message);
						   individu.setFormation(null);
						   individu.setTeam(null);
					   }
					   planificationRepository.deleteById(planification.getId());
				   }
			   }
			return "thank you";   
		   }
		   
}
