package pl.hordyjewiczmichal.fortnitebrmap.controller;

import com.fasterxml.jackson.databind.node.ObjectNode;
import javassist.NotFoundException;
import lombok.Getter;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.server.ResponseStatusException;
import pl.hordyjewiczmichal.fortnitebrmap.dto.NewItemDTO;
import pl.hordyjewiczmichal.fortnitebrmap.service.ItemService;
import pl.hordyjewiczmichal.fortnitebrmap.statics.Type;

public abstract class AbstractItemController
{
    @Autowired
    protected ItemService itemService;

    @Getter
    protected Type type;


    protected AbstractItemController(Type type)
    {
        this.type = type;
    }

    /* GET MAPPINGS */
    @GetMapping
    protected ObjectNode getAll()
    {
        return itemService.getItems(getType());
    }

    @GetMapping("/{location:.+}")
    protected ObjectNode getInLocation(@PathVariable String location)
    {
        try
        {
            return itemService.getItemsInLocation(getType(), location);
        }
        catch (NotFoundException e)
        {
            throw new ResponseStatusException(HttpStatus.NOT_FOUND, "Location '" + e.getMessage() + "' not found");
        }
    }

    @GetMapping("/random")
    protected ObjectNode getRandom()
    {
        return itemService.getRandomItem(getType());
    }

    @GetMapping("/random/{limit:\\d+}")
    protected ObjectNode getRandom(@PathVariable int limit)
    {
        return itemService.getRandomItem(getType(), limit);
    }

    /* POST MAPPINGS */
    @PostMapping
    @ResponseStatus(HttpStatus.CREATED)
    protected NewItemDTO addItem(@RequestBody NewItemDTO newItemDTO)
    {
        // save to db.... // todo
        return newItemDTO;
    }

    /* PUT MAPPINGS */

    /* DELETE MAPPINGS */
}
