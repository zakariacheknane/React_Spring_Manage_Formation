package com.manageformation.services;

import java.util.List;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import com.manageformation.entities.Formation;
import com.manageformation.repositories.FormationRepository;


@Service
public class FormationService {
	@Autowired 
	private FormationRepository formationRep;

	public Formation addFormation( Formation formationInfo) {
		return formationRep.save(formationInfo);
	}
	public Formation updateFormation( Formation formationInfo) {
		return formationRep.save(formationInfo);
	}
	public String deleteFormationById( int id) {
		formationRep.deleteById(id);
		return "formation deleted";
	}
	public List<Formation> getAllFormations(){
		return formationRep.findAll();
		 
	}
}
