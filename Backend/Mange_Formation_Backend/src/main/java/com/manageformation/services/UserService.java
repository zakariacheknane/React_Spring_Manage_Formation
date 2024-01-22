package com.manageformation.services;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import com.manageformation.entities.Formateur;
import com.manageformation.entities.UserInfo;
import com.manageformation.repositories.FormateurRepository;
import com.manageformation.repositories.UserInfoRepository;
import jakarta.annotation.PostConstruct;
@Service
public class UserService {
    @Autowired
    private UserInfoRepository userrepository;
    @Autowired
    private FormateurRepository  formateurrepo;
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
        
    }
  public String addFormateurIntern(Formateur formateurInfo) {
	  formateurInfo.setPassword(passwordEncoder.encode(formateurInfo.getPassword()));
	  formateurInfo.setRoles("ROLE_FORMATEUR");
	  formateurInfo.setType("INTERN");
	  formateurrepo.save(formateurInfo);
      return "Formateur added to system ";
  }
  public String addFormateurExtern(Formateur formateurInfo) {
	  formateurInfo.setPassword(passwordEncoder.encode(formateurInfo.getPassword()));
	  formateurInfo.setRoles("ROLE_FORMATEUR");
	  formateurInfo.setType("EXTERN");
	  formateurrepo.save(formateurInfo);
      return "Formateur externe added to system ";
  }
}
