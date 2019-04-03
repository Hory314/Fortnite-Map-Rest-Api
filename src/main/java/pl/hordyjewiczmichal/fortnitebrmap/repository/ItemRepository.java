package pl.hordyjewiczmichal.fortnitebrmap.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import pl.hordyjewiczmichal.fortnitebrmap.model.Item;
import pl.hordyjewiczmichal.fortnitebrmap.service.Location;
import pl.hordyjewiczmichal.fortnitebrmap.service.Type;

import java.util.List;

public interface ItemRepository extends JpaRepository<Item, Long>
{
    List<Item> findItemsByType(Type type);

    List<Item> findByTypeAndLocation(Type type, Location location);
}
