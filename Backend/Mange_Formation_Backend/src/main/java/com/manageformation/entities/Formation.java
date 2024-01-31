package com.manageformation.entities;

import java.time.LocalDate;
import java.util.List;

import com.fasterxml.jackson.annotation.JsonIgnore;

import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.OneToMany;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Entity
@Data
@NoArgsConstructor
@AllArgsConstructor
public class Formation {
    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private int id;
    private String name_formation;
    private int nb_hours;
    private double cost;
    private String objectif; 
    private String programme;
    private String city;
    private String category;
    private Long team_seuil;
    private LocalDate date;
    
    @OneToMany(mappedBy = "formation")
    @JsonIgnore
    private List<Individu> inscrits;

    @OneToMany(mappedBy = "formation")
    @JsonIgnore
    private List<Team> teams;
    @OneToMany(mappedBy = "formation")
    @JsonIgnore
    private List<Formateur> formateurs;
}
