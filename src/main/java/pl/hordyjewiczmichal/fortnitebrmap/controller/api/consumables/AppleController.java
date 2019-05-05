package pl.hordyjewiczmichal.fortnitebrmap.controller.api.consumables;

import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import pl.hordyjewiczmichal.fortnitebrmap.controller.api.AbstractItemController;
import pl.hordyjewiczmichal.fortnitebrmap.statics.Type;

@RestController
@RequestMapping("/api/apples")
public class AppleController extends AbstractItemController
{
    public AppleController()
    {
        super(Type.APPLE);
    }
}
