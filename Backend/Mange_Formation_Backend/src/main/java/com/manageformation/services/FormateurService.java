package com.manageformation.services;

import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.dao.DataIntegrityViolationException;
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
    @Autowired
    MailService emailService;
	public String addFormateurIntern(Formateur formateurInfo) {
	   	String Subject = "Formation Center - Email Credentials";
    	String message = "Hello " + formateurInfo.getFirstname() + " " + formateurInfo.getLastname() + ",\n" +
    	        "\n" +
    	        "Here are your login credentials:\n" +
    	        "\n" +
    	        "Username: " + formateurInfo.getEmail() + "\n" +
    	        "Password: " + "formateur1234" + "\n\n" +
    	        "\n" +
    	        "Note: This is an automated email. Please don't reply to it.";
		  formateurInfo.setPassword(passwordEncoder.encode("formateur1234"));
		  formateurInfo.setRoles("ROLE_FORMATEUR");
		  formateurInfo.setType("INTERN");
		  formateurInfo.setAccepted(true);
	    	emailService.sendMail(formateurInfo.getEmail(), Subject, message);
		  try {
			  formateurrepo.save(formateurInfo);
		    	}catch (DataIntegrityViolationException e) {
		            return "Error: Email already exists. Please choose a different email.";
		        }
		    	return "Formater Interne added succesfuly";	
		    }
	  
	public List<Formateur> getAllFormateurs(){
		return formateurrepo.findAll();
		 
	}
	public Formateur updateFormateur( Formateur formateurInfo) {
		formateurInfo.setPassword(passwordEncoder.encode(formateurInfo.getPassword()));
		formateurInfo.setRoles(formateurInfo.getRoles());
		formateurInfo.setType(formateurInfo.getType());
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
		  formateurInfo.setAccepted(false);
		  formateurInfo.setFormation(formation.get());
		  try {
		  formateurrepo.save(formateurInfo);
		  }catch (DataIntegrityViolationException e) {
	            return "Error: Email already exists. Please choose a different email.";
	        }
	      return "Formateur added to system ";
	  }
    public long countFormateurs() {
        return formateurrepo.count();
    }
    public List<Formateur> findNonAcceptedFormateurs() {
        return formateurrepo.findByAcceptedFalse();
    }
    public String AcceptFormateurAndSendEmail(Formateur formateur) {
    	String Subject = "Formation Center - Email Credentials";
    	String message = "Hello " + formateur.getFirstname() + " " + formateur.getLastname() + ",\n" +
    	        "\n" +
    	        "Congratulations! You have been accepted as a trainer for the formation: " + formateur.getFormation().getName_formation() + ".\n" +
    	        "\n" +
    	        "Here are your login credentials:\n" +
    	        "\n" +
    	        "Username: " + formateur.getEmail() + "\n" +
    	        "Password: " + "formateur2024" + "\n\n" +
    	        "\n" +
    	        "Note: This is an automated email. Please don't reply to it.";

    	emailService.sendMail(formateur.getEmail(), Subject, message);
    	formateur.setAccepted(true);
    	formateurrepo.save(formateur);
    	
        return "welcome";
    }
    public Formateur findbyEmail(String email) {
    	Optional<Formateur> formateur = formateurrepo.findByEmail(email);
     return formateur.get();        
    }
}
