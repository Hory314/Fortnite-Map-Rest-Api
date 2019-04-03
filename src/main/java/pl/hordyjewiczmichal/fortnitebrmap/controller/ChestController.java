package pl.hordyjewiczmichal.fortnitebrmap.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import pl.hordyjewiczmichal.fortnitebrmap.dto.GeoJSON;
import pl.hordyjewiczmichal.fortnitebrmap.service.ItemService;

@RestController
@RequestMapping("/api/chests")
public class ChestController
{
    @Autowired
    ItemService itemService;

    @GetMapping
    public GeoJSON getAllChests()
    {
        return itemService.getItems("chest");
    }
}
