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
import com.manageformation.entities.Formateur;
import com.manageformation.services.FormateurService;

@RestController
@RequestMapping("/formateur")
@CrossOrigin("*")
public class FormateurController {
	@Autowired
    private FormateurService formateurservice;
	@PostMapping("/newFormateurIntern")
    @PreAuthorize("hasAuthority('ROLE_ADMIN')")
    public String addNewFormateurIntern(@RequestBody Formateur formateurInfo) {
        return formateurservice.addFormateurIntern(formateurInfo);
    }
	@PutMapping("/update")
    @PreAuthorize("hasAnyAuthority('ROLE_ADMIN','ROLE_ASSISTENT','ROLE_FORMATEUR')")
	public Formateur updateFormateur(@RequestBody Formateur formateurInfo) {
		return formateurservice.updateFormateur(formateurInfo);
	}
	@DeleteMapping("/delete/{id}")
	 @PreAuthorize("hasAuthority('ROLE_ADMIN','ROLE_FORMATEUR')")
	public String deleteFormateur(@PathVariable int id) {
	 return formateurservice.deleteFormateurById(id);
	}
	@GetMapping("/all")
    @PreAuthorize("hasAnyAuthority('ROLE_ADMIN','ROLE_ASSISTENT')")
	public List<Formateur> getAllFormateurs(){
		return formateurservice.getAllFormateurs();
	}
	@PostMapping("/newFormateurExtern/{formation_id}")
    public String addNewFormateurExtern(@RequestBody Formateur formateurInfo,@PathVariable int formation_id) {
        return formateurservice.addFormateurExtern(formateurInfo,formation_id);
    }
	@GetMapping("/count")
	@PreAuthorize("hasAnyAuthority('ROLE_ADMIN','ROLE_ASSISTENT')")
	public Long countFormateurs(){
		return formateurservice.countFormateurs();
	}
}
