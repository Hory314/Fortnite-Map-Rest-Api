package pl.hordyjewiczmichal.fortnitebrmap.controller.api.consumables;

import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import pl.hordyjewiczmichal.fortnitebrmap.controller.api.AbstractItemController;
import pl.hordyjewiczmichal.fortnitebrmap.statics.Type;

@RestController
@RequestMapping("/api/peppers")
public class PepperController extends AbstractItemController
{
    public PepperController()
    {
        super(Type.PEPPER);
    }
}
