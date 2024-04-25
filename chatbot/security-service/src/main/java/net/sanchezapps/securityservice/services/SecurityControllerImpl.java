package net.sanchezapps.securityservice.services;

import net.sanchezapps.api.core.security.SecurityController;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.RestController;
import reactor.core.publisher.Mono;
@RestController
public class SecurityControllerImpl implements SecurityController {
    private final SecurityService service;
    @Autowired
    public SecurityControllerImpl(SecurityService service) {
        this.service = service;
    }

    @Override
    public Mono<String> hashString(String stringToHash) {
        return service.hashString(stringToHash);
    }

    @Override
    public Mono<Boolean> compareHash(String string1, String string2) {
        return service.compareHashedStrings(string1,string2);
    }

    @Override
    public Mono<Boolean> hashAndCompare(String string1, String string2) {
        return service.hashAndCompare(string1,string2);
    }
}
