package com.manageformation.controllers;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.manageformation.entities.Individu;
import com.manageformation.services.IndividuService;

@RestController
@RequestMapping("/individu")
@CrossOrigin("*")
public class IndividuController {
	@Autowired
    private IndividuService individuService;
	@PostMapping("/registration/{formation_id}")
	public String addIndividu(@RequestBody Individu individuInfo,@PathVariable int formation_id ) {
		individuService.registration(individuInfo,formation_id);
		return "hello";
	}
	
	@DeleteMapping("/delete/{id}")
	 @PreAuthorize("hasAuthority('ROLE_ADMIN')")
	public String deleteFormation(@PathVariable int id) {
	 return individuService.deleteIndividu(id);
	}
	@GetMapping("/all")
	@PreAuthorize("hasAuthority('ROLE_ADMIN')")
	public List<Individu> getAllFormations(){
		return individuService.getAllIndividus();
	}
	@GetMapping("/count")
	public long countIndividu() {
	    return individuService.countIndividu();
	}
}


