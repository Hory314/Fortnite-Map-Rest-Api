package pl.hordyjewiczmichal.fortnitebrmap.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import pl.hordyjewiczmichal.fortnitebrmap.model.Location;

@Repository
public interface LocationRepository extends JpaRepository<Location, Long>
{
    Location findByEn(String location);
}
