package com.manageformation.entities;

import com.fasterxml.jackson.annotation.JsonIgnore;

import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.ManyToOne;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Entity
@Data @NoArgsConstructor @AllArgsConstructor
public class Feedback {
	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private Integer id;
	private Integer qualite;
	private Integer rythme;
	private Integer coursTp;
	private Integer maitrise;
	@ManyToOne
	@JsonIgnore
	private Individu individu;
	@ManyToOne
	@JsonIgnore
	private Formateur formateur;
	}