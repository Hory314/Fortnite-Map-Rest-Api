package pl.hordyjewiczmichal.fortnitebrmap.controller.api.loot;

import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import pl.hordyjewiczmichal.fortnitebrmap.controller.api.AbstractItemController;
import pl.hordyjewiczmichal.fortnitebrmap.statics.Type;

@RestController
@RequestMapping("/api/vending-machines")
public class VendingMachineController extends AbstractItemController
{
    public VendingMachineController()
    {
        super(Type.VENDING_MACHINE);
    }
}
