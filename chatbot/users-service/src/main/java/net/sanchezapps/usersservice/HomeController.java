package net.sanchezapps.usersservice;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
public class HomeController {
    @Value("${api.common.version}")
    private String apiVersion;
    @GetMapping("/")
    public String helloWorld() {
        return "Users Service Home Controller";
    }
    @GetMapping("/version")
    public String appVersion() {
        return apiVersion;
    }
}
