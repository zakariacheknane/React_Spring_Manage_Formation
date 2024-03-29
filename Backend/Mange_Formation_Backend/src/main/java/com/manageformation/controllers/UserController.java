package com.manageformation.controllers;


import java.util.Optional;
import java.util.stream.Collectors;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.web.bind.annotation.*;

import com.manageformation.config.UserInfoUserDetails;
import com.manageformation.dto.AuthRequest;
import com.manageformation.dto.JwtResponse;
import com.manageformation.entities.Formateur;
import com.manageformation.entities.UserInfo;
import com.manageformation.services.JwtService;
import com.manageformation.services.UserService;



@RestController
@RequestMapping("/users")
@CrossOrigin("*")
public class UserController {
    @Autowired
    private JwtService jwtService;
    @Autowired
    private AuthenticationManager authenticationManager;
    @Autowired
    private UserService userService;
    
    @PostMapping("/authenticate")
    public ResponseEntity<?>authenticateAndGetToken(@RequestBody AuthRequest authRequest) {
        Authentication authentication = authenticationManager.authenticate(new UsernamePasswordAuthenticationToken(authRequest.getUsername(), authRequest.getPassword()));
        UserInfoUserDetails userDetails=(UserInfoUserDetails) authentication.getPrincipal();
        String jwt=jwtService.generateToken(authRequest.getUsername());
       String roles = userDetails.getAuthorities().stream()
                .map(GrantedAuthority::getAuthority)
                .collect(Collectors.joining(","));
        if (authentication.isAuthenticated()) {
            return ResponseEntity.ok(new JwtResponse(jwt, 
                   roles, 
                    userDetails.getUsername()));
        } else {
            throw new UsernameNotFoundException("invalid user request !");
        }
    }
    @PostMapping("/newAssistant")
    @PreAuthorize("hasAuthority('ROLE_ADMIN')")
    public String addNewAssitant(@RequestBody UserInfo userInfo) {
        return userService.addAssitant(userInfo);
    } 
    @GetMapping("/sendPasswordResetEmail/{email}")
    public String sendPasswordResetEmail(@PathVariable String email) {
    	return userService.sendPasswordResetEmail(email);
    } 
    @PutMapping("/updatePassword/{id}/{password}")
	public String updatePassword(@PathVariable int id,@PathVariable String password ) {
          return userService.updatePassword(id, password);
	}
    @GetMapping("/findByEmail/{email}")
    @PreAuthorize("hasAnyAuthority('ROLE_ADMIN','ROLE_ASSISTENT','ROLE_FORMATEUR')")
	public UserInfo findByEmail( @PathVariable String email ) {
		return userService.findByEmail(email);
	}
}
