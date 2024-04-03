package net.sanchezapps.api.composite;

import org.springframework.web.bind.annotation.GetMapping;

public interface CompositeController {
    @GetMapping(value = "/product-composite")
    void getComposite();
}
