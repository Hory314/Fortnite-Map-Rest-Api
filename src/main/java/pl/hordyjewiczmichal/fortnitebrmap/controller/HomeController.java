package pl.hordyjewiczmichal.fortnitebrmap.controller;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;

@Controller
@RequestMapping("/")
public class HomeController
{
    @RequestMapping
    public String home()
    {
        return "home";
    }

    @RequestMapping("/reboot-vans")
    public String getRebootVans()
    {
        return "reboot-vans";
    }

    @RequestMapping("/fortbytes")
    public String getFrotbytes()
    {
        return "fortbytes";
    }
}
