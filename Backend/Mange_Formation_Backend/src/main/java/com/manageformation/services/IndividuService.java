package com.manageformation.services;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.manageformation.entities.Individu;
import com.manageformation.repositories.IndividuRepository;

@Service
public class IndividuService {
	    @Autowired
	    private IndividuRepository individuRepository;

	    public List<Individu> getAllIndividus() {
	        return individuRepository.findAll();
	    }
	    public Individu addIndividu(Individu individuInfo) {
	        return individuRepository.save(individuInfo);
	    }
	    public Individu updateIndividu( Individu updatedIndividu) {
	        return individuRepository.save(updatedIndividu);
	    }
	    public String deleteIndividu(int id) {
	    	individuRepository.deleteById(id);
			return "Individu deleted";
	    }
}
