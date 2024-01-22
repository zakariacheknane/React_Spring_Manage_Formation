package com.manageformation.controllers;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import com.manageformation.entities.Formation;
import com.manageformation.services.FormationService;

@RestController
@CrossOrigin("*")
@RequestMapping("/formation")
public class FormationController {
	@Autowired
	private FormationService formationService;
	@PostMapping("/add")
	 @PreAuthorize("hasAuthority('ROLE_ADMIN','ROLE_ASSISTENT')")
	public Formation addFormation(@RequestBody Formation formationInfo) {
		return formationService.addFormation(formationInfo);
	}
	@PutMapping("/update")
	public Formation updateFormation(@RequestBody Formation formationInfo) {
		return formationService.updateFormation(formationInfo);
	}
	@DeleteMapping("/delete/{id}")
	 @PreAuthorize("hasAuthority('ROLE_ADMIN')")
	public String deleteFormation(@PathVariable int id) {
	 return formationService.deleteFormationById(id);
	}
	@GetMapping("/all")
	public List<Formation> getAllFormations(){
		return formationService.getAllFormations();
	}

}
