package pl.hordyjewiczmichal.fortnitebrmap.controller;


import lombok.Getter;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import pl.hordyjewiczmichal.fortnitebrmap.dto.GeoJSON;
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
    protected GeoJSON getAll()
    {
        return itemService.getItems(getType());
    }
}
