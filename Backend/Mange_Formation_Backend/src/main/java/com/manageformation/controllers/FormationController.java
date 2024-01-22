package com.manageformation.controllers;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;
import com.manageformation.entities.Formation;
import com.manageformation.services.FormationService;

@RestController

public class FormationController {
	@Autowired
	private FormationService formationService;
	@PostMapping("/formation/add")
	public Formation addFormation(@RequestBody Formation formationInfo) {
		return formationService.addFormation(formationInfo);
	}
	@PutMapping("/formation/up")
	public Formation updateFormation(@RequestBody Formation formationInfo) {
		return formationService.updateFormation(formationInfo);
	}
	@DeleteMapping("/formation/{id}")
	public String deleteFormation(@PathVariable int id) {
	 return formationService.deleteFormationById(id);
	}
	@GetMapping("/formation")
	public List<Formation> getAllFormations(){
		return formationService.getAllFormations();
	}

}
