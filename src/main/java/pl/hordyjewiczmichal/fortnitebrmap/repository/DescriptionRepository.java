package pl.hordyjewiczmichal.fortnitebrmap.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import pl.hordyjewiczmichal.fortnitebrmap.model.Description;

@Repository
public interface DescriptionRepository extends JpaRepository<Description, Long>
{
}
