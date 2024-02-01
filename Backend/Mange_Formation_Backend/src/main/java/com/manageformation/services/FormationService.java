package com.manageformation.services;

import java.time.LocalDate;
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
		formationInfo.setDate(LocalDate.now());
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
	 public List<Formation> findByCategory(String categorie) {
		 List<Formation> formations = formationRep.findByCategory(categorie);
		 return formations;
	 }
	 public List<Formation> findByCity(String city) {
		 List<Formation> formations = formationRep.findByCity(city);
		 return formations;
	 }
	 public List<Formation> findByDate(LocalDate date) {
		 List<Formation> formations = formationRep.findByDate(date);
		 return formations;
	 }
	 public long countFormations() {
	        return formationRep.count();
	    }
}
