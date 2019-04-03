package pl.hordyjewiczmichal.fortnitebrmap.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import pl.hordyjewiczmichal.fortnitebrmap.model.Item;

import java.util.List;

public interface ItemRepository extends JpaRepository<Item, Long>
{
    List<Item> findItemsByType(String type);
}
