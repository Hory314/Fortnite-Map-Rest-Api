package pl.hordyjewiczmichal.fortnitebrmap.filter;

import javax.servlet.Filter;
import javax.servlet.FilterChain;
import javax.servlet.ServletRequest;
import javax.servlet.ServletResponse;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

//@Component
//@Order(1)
public class UnhandledExceptionsFilter implements Filter
{

    @Override
    public void doFilter(ServletRequest req, ServletResponse resp, FilterChain chain)
    {
        HttpServletResponse response = (HttpServletResponse) resp;
        HttpServletRequest request = (HttpServletRequest) req;
        try
        {
            chain.doFilter(req, resp);
            System.out.println(request.getRequestURL() + " status: " + response.getStatus());
        }
        catch (Throwable e)
        {
            //   throw new ResponseStatusException(HttpStatus.NOT_FOUND, e.getMessage());
        }
    }
}