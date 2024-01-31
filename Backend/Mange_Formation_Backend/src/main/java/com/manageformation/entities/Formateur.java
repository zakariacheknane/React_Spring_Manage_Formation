package com.manageformation.entities;

import jakarta.persistence.Entity;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@AllArgsConstructor
@NoArgsConstructor
@Data
@Entity
public class Formateur extends UserInfo{
   String type;
   String skills;
   String remarks;
   @ManyToOne
   @JoinColumn(name = "formation_id")
   private Formation formation;
}
