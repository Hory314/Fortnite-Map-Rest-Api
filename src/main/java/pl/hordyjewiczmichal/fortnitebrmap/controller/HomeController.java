package pl.hordyjewiczmichal.fortnitebrmap.controller;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;

@Controller
@RequestMapping("/")
public class HomeController
{
    @GetMapping
    public String home()
    {
        return "test";
    }

    @GetMapping("/reboot-vans")
    public String getRebootVans()
    {
        return "test";
    }
}
