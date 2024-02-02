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
		String subject = "Formation : " + individu.getFormation().getName_formation();
		 String body = "Welcome  " + individu.getFirstName()+" "+individu.getLastName() + ",\n\n"+
	                "Thank you for registering for the  " + individu.getFormation().getName_formation() + "training,\n\n"+
	                "We will contact you when the training begins.";
		emailService.sendMail(individu.getEmail(), subject, body);
		return "welcome";
	}
	
	@DeleteMapping("/delete/{id}")
	@PreAuthorize("hasAnyAuthority('ROLE_ADMIN','ROLE_ASSISTENT')")
	public String deleteFormation(@PathVariable int id) {
	 return individuService.deleteIndividu(id);
	}
	@GetMapping("/all")
	@PreAuthorize("hasAnyAuthority('ROLE_ADMIN','ROLE_ASSISTENT')")
	public List<Individu> getAllIndividus(){
		return individuService.getAllIndividus();
	}
	@GetMapping("/count")
	@PreAuthorize("hasAnyAuthority('ROLE_ADMIN','ROLE_ASSISTENT')")
	public long countIndividu() {
	    return individuService.countIndividu();
	}
}


