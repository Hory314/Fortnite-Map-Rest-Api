package pl.hordyjewiczmichal.fortnitebrmap.controller.vehicles;

import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import pl.hordyjewiczmichal.fortnitebrmap.controller.AbstractItemController;
import pl.hordyjewiczmichal.fortnitebrmap.statics.Type;

@RestController
@RequestMapping("/api/pirate-cannons")
public class PirateCannonController extends AbstractItemController
{
    public PirateCannonController()
    {
        super(Type.PIRATE_CANNON);
    }
}