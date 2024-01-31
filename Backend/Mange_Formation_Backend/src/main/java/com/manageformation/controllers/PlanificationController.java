package com.manageformation.controllers;

import java.time.LocalDate;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.http.HttpStatus;

import com.manageformation.entities.Planification;
import com.manageformation.services.PlanificationService;

@RestController
@RequestMapping("/planification")
@CrossOrigin("*")
public class PlanificationController {
	@Autowired
    private PlanificationService planificationService;
	@GetMapping("/all")
	@PreAuthorize("hasAnyAuthority('ROLE_ADMIN','ROLE_ASSISTENT')")
	public List<Planification> getAllPlanifications() {
	   return planificationService.getAllPlanifications();
	  }
	@PostMapping("/planify")
	@PreAuthorize("hasAnyAuthority('ROLE_ADMIN','ROLE_ASSISTENT')")
	public ResponseEntity<String> planifyFormation(
	    @RequestParam LocalDate startDate,
	    @RequestParam LocalDate endDate,
	    @RequestParam int formationId,
	    @RequestParam int formateurId,
	    @RequestParam int entrepriseId,
	    @RequestParam int teamId
	) {
	    try {
	        Planification plannedFormation = planificationService.planifyFormation(startDate, endDate, formationId, formateurId, entrepriseId,teamId);
	        return new ResponseEntity<>("Formation planned successfully with ID: " + plannedFormation.getId(), HttpStatus.CREATED);
	    } catch (Exception e) {
	        return new ResponseEntity<>("Error planning formation", HttpStatus.INTERNAL_SERVER_ERROR);
	    }
	}
	 @PutMapping("/update")
	    @PreAuthorize("hasAnyAuthority('ROLE_ADMIN','ROLE_ASSISTENT')")
	    public ResponseEntity<String> updatePlanification(@RequestBody Planification updatedPlanification) {
	        try {
	            Planification updatedFormation = planificationService.updatePlanification(updatedPlanification);
	            return new ResponseEntity<>("Formation updated successfully with ID: " + updatedFormation.getId(), HttpStatus.OK);}
	          catch (Exception e) {
	            return new ResponseEntity<>("Error updating formation", HttpStatus.INTERNAL_SERVER_ERROR);
	        }
	    }

	    @DeleteMapping("/delete/{id}")
	    @PreAuthorize("hasAnyAuthority('ROLE_ADMIN','ROLE_ASSISTENT')")
	    public ResponseEntity<String> deletePlanification(@PathVariable int id) {
	        try {
	            String result = planificationService.deletePlanification(id);
	            return new ResponseEntity<>(result, HttpStatus.OK);
	        }  catch (Exception e) {
	            return new ResponseEntity<>("Error deleting formation", HttpStatus.INTERNAL_SERVER_ERROR);
	        }
	    }
	}