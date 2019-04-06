package pl.hordyjewiczmichal.fortnitebrmap.controller.vehicles;

import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import pl.hordyjewiczmichal.fortnitebrmap.controller.AbstractItemController;
import pl.hordyjewiczmichal.fortnitebrmap.statics.Type;

@RestController
@RequestMapping("/api/drift-boards")
public class DriftBoardController extends AbstractItemController
{
    public DriftBoardController()
    {
        super(Type.DRIFT_BOARD);
    }
}
