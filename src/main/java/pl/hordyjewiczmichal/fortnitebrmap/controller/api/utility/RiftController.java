package pl.hordyjewiczmichal.fortnitebrmap.controller.api.utility;

import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import pl.hordyjewiczmichal.fortnitebrmap.controller.api.AbstractItemController;
import pl.hordyjewiczmichal.fortnitebrmap.statics.Type;

@RestController
@RequestMapping("/api/rifts")
public class RiftController extends AbstractItemController
{
    public RiftController()
    {
        super(Type.RIFT);
    }
}
