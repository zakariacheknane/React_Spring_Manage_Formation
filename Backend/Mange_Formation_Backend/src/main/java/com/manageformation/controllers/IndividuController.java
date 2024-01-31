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
import com.manageformation.services.MailService;

@RestController
@RequestMapping("/individu")
@CrossOrigin("*")
public class IndividuController {
	@Autowired
    private IndividuService individuService;
	 @Autowired
	    MailService emailService;
	@PostMapping("/registration/{formation_id}")
	public String addIndividu(@RequestBody Individu individuInfo,@PathVariable int formation_id ) {
		Individu individu=individuService.registration(individuInfo,formation_id);
		emailService.sendMail(individu.getEmail(), "welcome", "hello");
		return "hello";
	}
	
	@DeleteMapping("/delete/{id}")
	 @PreAuthorize("hasAuthority('ROLE_ADMIN')")
	public String deleteFormation(@PathVariable int id) {
	 return individuService.deleteIndividu(id);
	}
	@GetMapping("/all")
	@PreAuthorize("hasAuthority('ROLE_ADMIN')")
	public List<Individu> getAllIndividus(){
		return individuService.getAllIndividus();
	}
	@GetMapping("/count")
	public long countIndividu() {
	    return individuService.countIndividu();
	}
}


