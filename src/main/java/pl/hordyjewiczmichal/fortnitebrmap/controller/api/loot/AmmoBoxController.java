package pl.hordyjewiczmichal.fortnitebrmap.controller.api.loot;

import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import pl.hordyjewiczmichal.fortnitebrmap.controller.api.AbstractItemController;
import pl.hordyjewiczmichal.fortnitebrmap.statics.Type;

@RestController
@RequestMapping("/api/ammo-boxes")
public class AmmoBoxController extends AbstractItemController
{
    public AmmoBoxController()
    {
        super(Type.AMMO_BOX);
    }
}
