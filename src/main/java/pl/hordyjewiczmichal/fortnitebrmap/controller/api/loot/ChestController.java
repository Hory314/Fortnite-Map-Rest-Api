package pl.hordyjewiczmichal.fortnitebrmap.controller.api.loot;

import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import pl.hordyjewiczmichal.fortnitebrmap.controller.api.AbstractItemController;
import pl.hordyjewiczmichal.fortnitebrmap.statics.Type;

@RestController
@RequestMapping("/api/chests")
public class ChestController extends AbstractItemController
{
    public ChestController()
    {
        super(Type.CHEST);
    }
}
