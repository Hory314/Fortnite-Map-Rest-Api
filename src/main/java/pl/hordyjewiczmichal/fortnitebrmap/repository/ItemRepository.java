package pl.hordyjewiczmichal.fortnitebrmap.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import pl.hordyjewiczmichal.fortnitebrmap.model.Item;
import pl.hordyjewiczmichal.fortnitebrmap.statics.Location;
import pl.hordyjewiczmichal.fortnitebrmap.statics.Type;

import java.util.List;

public interface ItemRepository extends JpaRepository<Item, Long>
{
    List<Item> findItemsByType(Type type);

    List<Item> findByTypeAndLocation(Type type, Location location);

    @Query(value = "SELECT * FROM items WHERE type = ?1 ORDER BY RAND() LIMIT ?2", nativeQuery = true)
    List<Item> findRandom(String type, int limit);

//    List<Item> findFirstByTypeOrderByRnd(Type type);
}
