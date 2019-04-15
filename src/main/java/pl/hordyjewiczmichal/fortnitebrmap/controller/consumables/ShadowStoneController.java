package pl.hordyjewiczmichal.fortnitebrmap.controller.consumables;

import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import pl.hordyjewiczmichal.fortnitebrmap.controller.AbstractItemController;
import pl.hordyjewiczmichal.fortnitebrmap.statics.Type;

@RestController
@RequestMapping("/api/shadow-stones")
public class ShadowStoneController extends AbstractItemController
{
    public ShadowStoneController()
    {
        super(Type.SHADOW_STONE);
    }
}
