package com.manageformation.services;

import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.manageformation.entities.Feedback;
import com.manageformation.entities.Formateur;
import com.manageformation.entities.Formation;
import com.manageformation.entities.Individu;
import com.manageformation.repositories.FeedbackRepository;
import com.manageformation.repositories.FormateurRepository;
import com.manageformation.repositories.IndividuRepository;

@Service
public class FeedbackService {
	  @Autowired
	    private FormateurRepository  formateurrepo;
	@Autowired
	private FeedbackRepository fr;
	@Autowired
    private IndividuRepository individuRepository;
	public Feedback addFeedback(Feedback feedback,int formateur_id,int individu_id) {
		  Optional<Formateur> formateur = formateurrepo.findById(formateur_id);
		  Optional<Individu> individu = individuRepository.findById(individu_id);
		  feedback.setFormateur(formateur.get());
		  feedback.setIndividu(individu.get());
		  return fr.save(feedback);
	}
	public List<Feedback> getAllFeedbacks(){
		return fr.findAll();
	}
	public List<Feedback> getByFormateurId(int id){
		return fr.findByFormateurId(id);
	}
}
