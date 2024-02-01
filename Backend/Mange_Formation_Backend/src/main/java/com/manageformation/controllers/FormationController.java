package com.manageformation.controllers;

import java.time.LocalDate;
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
@RequestMapping("/formation")
@CrossOrigin("*")
public class FormationController {
	@Autowired
	private FormationService formationService;
	@PostMapping("/add")
	@PreAuthorize("hasAuthority('ROLE_ADMIN')")
	public Formation addFormation(@RequestBody Formation formationInfo) {
		return formationService.addFormation(formationInfo);
	}
	
	@PutMapping("/update")
    @PreAuthorize("hasAnyAuthority('ROLE_ADMIN','ROLE_ASSISTENT')")
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
	@GetMapping("/findByCategory/{categorie}")
	 public List<Formation> findByCategory(@PathVariable String categorie) {
		 List<Formation> formations = formationService.findByCategory(categorie);
		 return formations;
	 }
	@GetMapping("/findByCity/{city}")
	 public List<Formation> findByCity(@PathVariable String city) {
		 List<Formation> formations = formationService.findByCity(city);
		 return formations;
	 }
	@GetMapping("/findByDate/{date}")
	 public List<Formation> findByDate(@PathVariable LocalDate date) {
		 List<Formation> formations = formationService.findByDate(date);
		 return formations;
	 }
	@GetMapping("/count")
	@PreAuthorize("hasAnyAuthority('ROLE_ADMIN','ROLE_ASSISTENT')")
	public Long countFormations(){
		return formationService.countFormations();
	}
}

