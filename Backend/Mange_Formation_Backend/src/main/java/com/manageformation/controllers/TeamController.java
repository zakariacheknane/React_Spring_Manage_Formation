package com.manageformation.controllers;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.manageformation.entities.Team;
import com.manageformation.services.TeamService;

@RestController
@RequestMapping("/team")
@CrossOrigin("*")
public class TeamController {
	@Autowired TeamService teamservice;
	@GetMapping("/all")
	public List<Team> getAllTeams(){
		return teamservice.getAllTeams(); 
	}
	@GetMapping("/findbyFormation/{formation_id}")
	public List<Team> findbyFormation(@PathVariable int formation_id){
		return teamservice.findbyFormation(formation_id); 
	}
}
