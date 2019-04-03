package pl.hordyjewiczmichal.fortnitebrmap.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.server.ResponseStatusException;
import pl.hordyjewiczmichal.fortnitebrmap.dto.GeoJSON;
import pl.hordyjewiczmichal.fortnitebrmap.service.ItemService;
import pl.hordyjewiczmichal.fortnitebrmap.service.Type;

@RestController
@RequestMapping("/api/chests")
public class ChestController
{
    @Autowired
    ItemService itemService;

    @GetMapping
    public GeoJSON getAllChests()
    {
        return itemService.getItems(Type.CHEST);
    }

    @GetMapping("/{location}")
    public GeoJSON getChestsInLocation(@PathVariable String location)
    {
        // itemService.save(); // test
        try
        {
            return itemService.getItemsInLocation(Type.CHEST, location);
        }
        catch (IllegalArgumentException e)
        {
//            System.out.println("złapałem wyjątek: " + e.getMessage());
//            return new GeoJSON();
            throw new ResponseStatusException(HttpStatus.NOT_FOUND, "404 - Location Not Found");
        }
    }
}
