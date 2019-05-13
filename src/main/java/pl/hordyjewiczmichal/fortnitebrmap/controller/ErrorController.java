package pl.hordyjewiczmichal.fortnitebrmap.controller;

import org.springframework.boot.autoconfigure.web.servlet.error.AbstractErrorController;
import org.springframework.boot.web.servlet.error.ErrorAttributes;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
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
    public String handleError(Model model, HttpServletRequest request)
    {
        String errorCode = "";
        try
        {
            errorCode = super.getErrorAttributes(request, false).get("status").toString();
        }
        catch (Exception e)
        {
            // TODO: log
        }

        model.addAttribute("errorCode", errorCode + " ");
        return "errors/error";
    }

    @Override
    public String getErrorPath()
    {
        return "/error";
    }
}
