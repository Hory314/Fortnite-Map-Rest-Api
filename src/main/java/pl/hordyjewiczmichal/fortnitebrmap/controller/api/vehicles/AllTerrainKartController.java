package pl.hordyjewiczmichal.fortnitebrmap.controller.api.vehicles;

import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import pl.hordyjewiczmichal.fortnitebrmap.controller.api.AbstractItemController;
import pl.hordyjewiczmichal.fortnitebrmap.statics.Type;

@RestController
@RequestMapping("/api/atks")
public class AllTerrainKartController extends AbstractItemController
{
    public AllTerrainKartController()
    {
        super(Type.ALL_TERRAIN_KART);
    }
}
