package pl.hordyjewiczmichal.fortnitebrmap.controller;

import org.springframework.boot.autoconfigure.web.servlet.error.AbstractErrorController;
import org.springframework.boot.web.servlet.error.ErrorAttributes;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;

import javax.servlet.http.HttpServletRequest;

@Controller
@RequestMapping("/error")
public class ErrorController extends AbstractErrorController
{
    public ErrorController(ErrorAttributes errorAttributes)
    {
        super(errorAttributes);
    }

    @RequestMapping
    public String handleError(HttpServletRequest request)
    {
        // getErrorAttributes(request, false).get("path").toString();
        return "testerror";
    }

    @Override
    public String getErrorPath()
    {
        return "/error";
    }
}
