package net.sanchezapps.securityservice.services;

import org.apache.commons.codec.digest.DigestUtils;
import org.springframework.stereotype.Service;
import reactor.core.publisher.Mono;

@Service
public class SecurityService {
    public Mono<String> hashString(String stringToHash)
    {
       return Mono.fromCallable(()-> DigestUtils.sha256Hex(stringToHash));
    }

    public Mono<Boolean> compareHashedStrings(String string1,String string2)
    {
        return Mono.fromCallable(()-> string1.equals(string2));
    }
    public Mono<Boolean> hashAndCompare(String string1,String string2)
    {
        return Mono.fromCallable(()-> {
            String hash1=DigestUtils.sha256Hex(string1);
            String hash2=DigestUtils.sha256Hex(string2);
            return string1.equals(string2);
        });
    }
}
