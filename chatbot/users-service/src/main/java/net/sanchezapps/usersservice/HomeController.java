package net.sanchezapps.usersservice;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
public class HomeController {
    
    
    @GetMapping("/")
    public String helloWorld() {
        return "Users Service Home Controller";
    }
    
}
