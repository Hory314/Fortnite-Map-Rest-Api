package pl.hordyjewiczmichal.fortnitebrmap.controller;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;

@Controller
@RequestMapping("/")
public class HomeController
{
    @RequestMapping
    public String main()
    {
        return "main";
    }

    @RequestMapping("/szymon")
    public String szymon()
    {
        return "szymon";
    }

    @RequestMapping("missions/season-10/week-1")
    public String week1()
    {
        return "season10/week1";
    }
}
