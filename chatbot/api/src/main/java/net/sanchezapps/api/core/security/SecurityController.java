package net.sanchezapps.api.core.security;

import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestParam;
import reactor.core.publisher.Mono;

public interface SecurityController {
    @PostMapping(value = "hashString")
    Mono<String> hashString(@RequestParam String stringToHash);
    @GetMapping(value = "compareHash")
    Mono<Boolean> compareHash(@RequestParam String string1,@RequestParam String string2);
    @GetMapping(value = "hashAndCompare")
    Mono<Boolean> hashAndCompare(@RequestParam String string1,@RequestParam String string2);
}
