package com.manageformation.services;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import com.manageformation.entities.Formateur;

import com.manageformation.repositories.FormateurRepository;
@Service
public class FormateurService {
    @Autowired
    private FormateurRepository  formateurrepo;
    @Autowired
    private PasswordEncoder passwordEncoder;
	public String addFormateurIntern(Formateur formateurInfo) {
		  formateurInfo.setPassword(passwordEncoder.encode(formateurInfo.getPassword()));
		  formateurInfo.setRoles("ROLE_FORMATEUR");
		  formateurInfo.setType("INTERN");
		  formateurrepo.save(formateurInfo);
	      return "Formateur added to system ";
	  }
	public List<Formateur> getAllFormateurs(){
		return formateurrepo.findAll();
		 
	}
	public Formateur updateFormateur( Formateur formateurInfo) {
		return formateurrepo.save(formateurInfo);
	}
	public String deleteFormateurById( int id) {
		formateurrepo.deleteById(id);
		return "formateur deleted";
	}
	public String addFormateurExtern(Formateur formateurInfo) {
		  formateurInfo.setPassword(passwordEncoder.encode("formateur2024"));
		  formateurInfo.setRoles("ROLE_FORMATEUR");
		  formateurInfo.setType("EXTERN");
		  formateurrepo.save(formateurInfo);
	      return "Formateur added to system ";
	  }
}
