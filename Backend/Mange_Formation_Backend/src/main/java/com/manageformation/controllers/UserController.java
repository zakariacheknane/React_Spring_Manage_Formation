package com.manageformation.controllers;


import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.web.bind.annotation.*;
import com.manageformation.dto.AuthRequest;
import com.manageformation.entities.Formateur;
import com.manageformation.services.JwtService;
import com.manageformation.services.UserService;

@RestController
@RequestMapping("/users")
public class UserController {
    @Autowired
    private UserService service;
    @Autowired
    private JwtService jwtService;
    @Autowired
    private AuthenticationManager authenticationManager;
    @GetMapping("/welcome")
    public String welcome() {
        return "Welcome this endpoint is not secure";
    }
    @PostMapping("/newFormateur")
    @PreAuthorize("hasAuthority('ROLE_ADMIN')")
    public String addNewFormateur(@RequestBody Formateur formateurInfo) {
        return service.addFormateurIntern(formateurInfo);
    }
    @PostMapping("/newFormateurextern")
    public String addNewFormateurex(@RequestBody Formateur formateurInfo) {
        return service.addFormateurExtern(formateurInfo);
    }
   // @PreAuthorize("hasAuthority('ROLE_USER')")
    @PostMapping("/authenticate")
    public String authenticateAndGetToken(@RequestBody AuthRequest authRequest) {
        Authentication authentication = authenticationManager.authenticate(new UsernamePasswordAuthenticationToken(authRequest.getUsername(), authRequest.getPassword()));
        if (authentication.isAuthenticated()) {
            return jwtService.generateToken(authRequest.getUsername());
        } else {
            throw new UsernameNotFoundException("invalid user request !");
        }
    }
}
