package com.manageformation.services;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.dao.DataIntegrityViolationException;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import com.manageformation.entities.Formateur;
import com.manageformation.entities.UserInfo;
import com.manageformation.repositories.UserInfoRepository;
import jakarta.annotation.PostConstruct;
@Service
public class UserService {
    @Autowired
    private UserInfoRepository userrepository;
    @Autowired
    private PasswordEncoder passwordEncoder;
    @PostConstruct
    public void initAdmin(){
        UserInfo admin =new UserInfo();
        admin.setId(1);
        admin.setFirstname("admin");
        admin.setLastname("admin");
        admin.setEmail("admin@admin");
        admin.setRoles("ROLE_ADMIN");
        admin.setPassword(passwordEncoder.encode("1234"));
        userrepository.save(admin);
        UserInfo assistent =new UserInfo();
        assistent.setId(2);
        assistent.setFirstname("assistent");
        assistent.setLastname("assistent");
        assistent.setEmail("assistent@assistent");
        assistent.setRoles("ROLE_ASSISTENT");
        assistent.setPassword(passwordEncoder.encode("1234"));
        userrepository.save(assistent); 
    }
	public String addAssitant(UserInfo assistent) {
		assistent.setPassword(passwordEncoder.encode("assitent1234"));
		assistent.setRoles("ROLE_ASSISTENT");
		 
		  try {
			  userrepository.save(assistent);
		    	}catch (DataIntegrityViolationException e) {
		            return "Error: Email already exists. Please choose a different email.";
		        }
		    	return "Assistent  added succesfuly";	
		    }
  
  
}
