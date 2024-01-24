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

import com.manageformation.entities.Enterprise;
import com.manageformation.services.EnterpriseService;

@RestController
@RequestMapping("/enterprise")
@CrossOrigin("*")
public class EnterpriseController {
	@Autowired
	private EnterpriseService enterpriseService;
	@PostMapping("/add")
    @PreAuthorize("hasAnyAuthority('ROLE_ADMIN','ROLE_ASSISTENT')")
	public Enterprise addEnterprise(@RequestBody Enterprise enterpriseInfo) {
		return enterpriseService.addEnterprise(enterpriseInfo);
	}
	
	@PutMapping("/update")
    @PreAuthorize("hasAnyAuthority('ROLE_ADMIN','ROLE_ASSISTENT')")
	public Enterprise updateEnterprise(@RequestBody Enterprise enterpriseInfo) {
		return enterpriseService.updateEnterprise(enterpriseInfo);
	}
	@DeleteMapping("/delete/{id}")
    @PreAuthorize("hasAnyAuthority('ROLE_ADMIN','ROLE_ASSISTENT')")
	public String deleteEnterprise(@PathVariable int id) {
	 return enterpriseService.deleteEnterpriseById(id);
	}
	@GetMapping("/all")
    @PreAuthorize("hasAnyAuthority('ROLE_ADMIN','ROLE_ASSISTENT')")
	public List<Enterprise> getAllEnterprise(){
		return enterpriseService.getAllEnterprises();
	}
}
