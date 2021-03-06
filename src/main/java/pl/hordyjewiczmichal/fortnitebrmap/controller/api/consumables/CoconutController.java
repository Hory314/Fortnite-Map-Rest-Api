package pl.hordyjewiczmichal.fortnitebrmap.controller.api.consumables;

import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import pl.hordyjewiczmichal.fortnitebrmap.controller.api.AbstractItemController;
import pl.hordyjewiczmichal.fortnitebrmap.statics.Type;

@RestController
@RequestMapping("/api/coconuts")
public class CoconutController extends AbstractItemController
{
    public CoconutController()
    {
        super(Type.COCONUT);
    }
}
