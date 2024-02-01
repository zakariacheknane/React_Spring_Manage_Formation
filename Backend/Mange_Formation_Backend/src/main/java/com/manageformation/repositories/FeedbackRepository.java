package com.manageformation.repositories;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;

import com.manageformation.entities.Feedback;
public interface FeedbackRepository extends JpaRepository<Feedback, Integer> {
	List<Feedback> findByFormateurId(int id);
}
