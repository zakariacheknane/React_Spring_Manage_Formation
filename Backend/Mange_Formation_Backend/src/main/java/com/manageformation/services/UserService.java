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
    public void initAdminAndAssistent(){
        UserInfo admin =new UserInfo();
        admin.setId(1);
        admin.setName("admin");
        admin.setEmail("admin@admin");
        admin.setRoles("ROLE_ADMIN");
        admin.setPassword(passwordEncoder.encode("1234"));
        userrepository.save(admin);
        UserInfo assistent =new UserInfo();
        assistent.setId(2);
        assistent.setName("assistent");
        assistent.setEmail("assistent@assistent");
        assistent.setRoles("ROLE_ASSISTENT");
        assistent.setPassword(passwordEncoder.encode("1234"));
        userrepository.save(assistent);
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
