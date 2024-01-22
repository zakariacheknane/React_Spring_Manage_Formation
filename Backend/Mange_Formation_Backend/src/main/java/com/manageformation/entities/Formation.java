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
	private String name_formation;
	private int nb_hours;
	private double cost;
	private String objectif; 
	private String programme;
	private Date dateStart;
	private Date dateEnd;
	private String city;
	private String category;
	
	
}
