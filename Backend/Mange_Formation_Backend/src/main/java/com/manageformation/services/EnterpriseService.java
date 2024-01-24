package com.manageformation.services;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.manageformation.entities.Enterprise;
import com.manageformation.repositories.EnterpriseRepository;


@Service
public class EnterpriseService {
	@Autowired 
	private EnterpriseRepository enterpriseRep;

	public Enterprise addEnterprise( Enterprise enterpriseInfo) {
		return enterpriseRep.save(enterpriseInfo);
	}
	public Enterprise updateEnterprise( Enterprise enterpriseInfo) {
		return enterpriseRep.save(enterpriseInfo);
	}
	public String deleteEnterpriseById( int id) {
		enterpriseRep.deleteById(id);
		return "Enterprise deleted";
	}
	public List<Enterprise> getAllEnterprises(){
		return enterpriseRep.findAll();
		 
	}
}
