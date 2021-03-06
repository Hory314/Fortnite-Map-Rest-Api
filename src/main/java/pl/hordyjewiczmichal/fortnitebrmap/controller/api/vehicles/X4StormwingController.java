package pl.hordyjewiczmichal.fortnitebrmap.controller.api.vehicles;

import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import pl.hordyjewiczmichal.fortnitebrmap.controller.api.AbstractItemController;
import pl.hordyjewiczmichal.fortnitebrmap.statics.Type;

@RestController
@RequestMapping("/api/planes")
public class X4StormwingController extends AbstractItemController
{
    public X4StormwingController()
    {
        super(Type.X4_STORMWING);
    }
}
