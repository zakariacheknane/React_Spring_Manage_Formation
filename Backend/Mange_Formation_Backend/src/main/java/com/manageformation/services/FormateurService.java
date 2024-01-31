package com.manageformation.services;

import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import com.manageformation.entities.Formateur;
import com.manageformation.entities.Formation;
import com.manageformation.repositories.FormateurRepository;
import com.manageformation.repositories.FormationRepository;
@Service
public class FormateurService {
    @Autowired
    private FormateurRepository  formateurrepo;
    @Autowired
    private FormationRepository formationRepository;
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
	public String addFormateurExtern(Formateur formateurInfo,int formation_id) {
		 Optional<Formation> formation = formationRepository.findById(formation_id);
		  formateurInfo.setPassword(passwordEncoder.encode("formateur2024"));
		  formateurInfo.setRoles("ROLE_FORMATEUR");
		  formateurInfo.setType("EXTERN");
		  formateurInfo.setFormation(formation.get());
		  formateurrepo.save(formateurInfo);
	      return "Formateur added to system ";
	  }
}
