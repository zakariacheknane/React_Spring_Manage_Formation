package com.manageformation.services;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.manageformation.entities.Planification;
import com.manageformation.repositories.PlanificationRepository;

@Service
public class PlanificationService {
	 @Autowired
	    private PlanificationRepository planificationRepository;

	    public List<Planification> getAllPlanifications() {
	        return planificationRepository.findAll();
	    }
	    public Planification planifyFormation(Planification planification) {
	        return planificationRepository.save(planification);
	    }
	    public Planification updatePlanification( Planification updatedPlanification) {
	        return planificationRepository.save(updatedPlanification);
	    }
	    public String deletePlanification(int id) {
	    	planificationRepository.deleteById(id);
			return "Planification deleted";
	    }
}
