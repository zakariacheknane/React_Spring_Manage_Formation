package com.manageformation.entities;

import java.util.List;

import com.fasterxml.jackson.annotation.JsonIgnore;

import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.OneToMany;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Entity
@Data
@AllArgsConstructor
@NoArgsConstructor
public class Team {
	@Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int id;

	    @JsonIgnore
	    @OneToMany(mappedBy = "team")
	    private List<Individu> inscrits;

	    @ManyToOne
	    @JoinColumn(name = "formation_id")
	     private Formation formation;

}
