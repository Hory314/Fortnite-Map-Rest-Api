package pl.hordyjewiczmichal.fortnitebrmap.controller;

import com.fasterxml.jackson.databind.node.ObjectNode;
import lombok.Getter;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.server.ResponseStatusException;
import pl.hordyjewiczmichal.fortnitebrmap.service.ItemService;
import pl.hordyjewiczmichal.fortnitebrmap.statics.Type;

public abstract class AbstractItemController
{
    @Autowired
    ItemService itemService;

    @Getter
    protected Type type;


    protected AbstractItemController(Type type)
    {
        this.type = type;
    }

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
        catch (Exception e)
        {
            throw new ResponseStatusException(HttpStatus.NOT_FOUND);
        }
    }

    @GetMapping("/random")
    protected ObjectNode getOneRandom()
    {
        return itemService.getRandomItem(getType());
    }
}
