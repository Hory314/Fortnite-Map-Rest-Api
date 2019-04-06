package pl.hordyjewiczmichal.fortnitebrmap.controller.consumables;

import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import pl.hordyjewiczmichal.fortnitebrmap.controller.AbstractItemController;
import pl.hordyjewiczmichal.fortnitebrmap.statics.Type;

@RestController
@RequestMapping("/api/hop-rocks")
public class HopRockController extends AbstractItemController
{
    public HopRockController()
    {
        super(Type.HOP_ROCK);
    }
}
