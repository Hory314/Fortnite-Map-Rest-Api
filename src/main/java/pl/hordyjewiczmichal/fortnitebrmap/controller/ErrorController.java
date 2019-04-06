package pl.hordyjewiczmichal.fortnitebrmap.controller;

import org.springframework.boot.autoconfigure.web.servlet.error.AbstractErrorController;
import org.springframework.boot.web.servlet.error.ErrorAttributes;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import javax.servlet.http.HttpServletRequest;
import java.util.Map;

@RestController
@RequestMapping("/error")
public class ErrorController extends AbstractErrorController
{
    public ErrorController(ErrorAttributes errorAttributes)
    {
        super(errorAttributes);
    }

    @RequestMapping
    public Map<String, Object> handleError(HttpServletRequest request)
    {
        return super.getErrorAttributes(request, false);
    }

    @Override
    public String getErrorPath()
    {
        return "/error";
    }
}
