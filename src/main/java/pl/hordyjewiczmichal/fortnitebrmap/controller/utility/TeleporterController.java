package pl.hordyjewiczmichal.fortnitebrmap.controller.utility;

import com.fasterxml.jackson.databind.node.ObjectNode;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import pl.hordyjewiczmichal.fortnitebrmap.controller.AbstractItemController;
import pl.hordyjewiczmichal.fortnitebrmap.statics.Type;

@RestController
@RequestMapping("/api/teleporters")
public class TeleporterController extends AbstractItemController
{
    public TeleporterController()
    {
        super(Type.TELEPORTER);
    }

    @Override
    @GetMapping
    protected ObjectNode getAll()
    {
        return itemService.getItemsWithLine(getType());
    }
}
