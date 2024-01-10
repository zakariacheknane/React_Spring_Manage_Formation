package com.manageformation.entities;
import java.util.Date;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
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
	private int nb_hours;
	private String name_form;
	private double cost;
	private Date date_form;
	private String programme;
	private String objectif; 
}
