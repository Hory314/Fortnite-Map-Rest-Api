package pl.hordyjewiczmichal.fortnitebrmap.controller.api.admin;

import com.fasterxml.jackson.databind.node.ObjectNode;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import pl.hordyjewiczmichal.fortnitebrmap.service.ItemService;

@RestController
@RequestMapping("/api/admin")
public class AllItemsController
{
    @Autowired
    private ItemService itemService;

    @GetMapping
    protected ObjectNode getAll()
    {
        return itemService.getAllItems();
    }
}
