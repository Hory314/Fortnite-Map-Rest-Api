package pl.hordyjewiczmichal.fortnitebrmap.controller.api.vehicles;

import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import pl.hordyjewiczmichal.fortnitebrmap.controller.api.AbstractItemController;
import pl.hordyjewiczmichal.fortnitebrmap.statics.Type;

@RestController
@RequestMapping("/api/quadcrashers")
public class QuadcrasherController extends AbstractItemController
{
    public QuadcrasherController()
    {
        super(Type.QUADCRASHER);
    }
}
