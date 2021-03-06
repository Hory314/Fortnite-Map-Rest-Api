package pl.hordyjewiczmichal.fortnitebrmap.service;

import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Service
@Transactional
public class LocationService
{

    public String parseLocation(String location)
    {
        if (location == null) return "";
        return location.replaceAll("[-_]", " ").toLowerCase();
    }
}
