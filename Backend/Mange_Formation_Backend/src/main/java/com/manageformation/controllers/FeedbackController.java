package com.manageformation.controllers;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.manageformation.entities.Feedback;
import com.manageformation.services.FeedbackService;

@RestController
@RequestMapping("/feedback")
@CrossOrigin("*")
public class FeedbackController {
	@Autowired
	private FeedbackService fs;
	
    @GetMapping("/all")
    @PreAuthorize("hasAnyAuthority('ROLE_ADMIN','ROLE_ASSISTANT')")
    public List<Feedback>findAll(){
    	return fs.getAllFeedbacks();
    }
    @PostMapping("/add/{formateur_id}/{individu_id}")
    public Feedback addNewFeedback(@RequestBody Feedback feedback,@PathVariable int formateur_id,@PathVariable int individu_id ) {
        return fs.addFeedback(feedback,formateur_id,individu_id);
    }
    @GetMapping("/formateur/{id}")
    @PreAuthorize("hasAnyAuthority('ROLE_ADMIN','ROLE_ASSISTANT')")
    public List<Feedback>getByFormateurId(@PathVariable int id){
    	return fs.getByFormateurId(id);
    }
}