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
import pl.hordyjewiczmichal.fortnitebrmap.statics.Type;

@RestController
@RequestMapping("/api/chests")
public class ChestController extends AbstractItemController
{
    @Autowired
    ItemService itemService;

    public ChestController()
    {
        super(Type.CHEST);
    }

    //@GetMapping
    public GeoJSON getAll()
    {
        return super.getAll();
    }
//    @GetMapping
//    public GeoJSON getAllChests()
//    {
//        return itemService.getItems(Type.CHEST);
//    }

    @GetMapping("/{location}")
    public GeoJSON getChestsInLocation(@PathVariable String location)
    {
        try
        {
            return itemService.getItemsInLocation(Type.CHEST, location);
        }
        catch (IllegalArgumentException e)
        {
            throw new ResponseStatusException(HttpStatus.NOT_FOUND, "404 - Location Not Found");
        }
    }

    @GetMapping("/random")
    public GeoJSON getOneRandomChest()
    {
        return itemService.getRandomItem(Type.CHEST);
    }

}
