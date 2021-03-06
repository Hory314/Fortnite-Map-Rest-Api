package pl.hordyjewiczmichal.fortnitebrmap.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import pl.hordyjewiczmichal.fortnitebrmap.model.Feedback;

@Repository
public interface FeedbackRepository extends JpaRepository<Feedback, Long>
{
}
