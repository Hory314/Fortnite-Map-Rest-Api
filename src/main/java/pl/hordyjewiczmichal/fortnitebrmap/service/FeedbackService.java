package pl.hordyjewiczmichal.fortnitebrmap.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import pl.hordyjewiczmichal.fortnitebrmap.dto.FeedbackDTO;
import pl.hordyjewiczmichal.fortnitebrmap.model.Feedback;
import pl.hordyjewiczmichal.fortnitebrmap.repository.FeedbackRepository;

@Service
@Transactional
public class FeedbackService
{
    @Autowired
    FeedbackRepository feedbackRepository;

    public void saveFeedback(FeedbackDTO feedbackDTO)
    {
        Feedback feedback = new Feedback();

        feedback.setFeedback(feedbackDTO.getFeedback().trim());
        if (!feedbackDTO.getEmail().equals(""))
        {
            feedback.setEmail(feedbackDTO.getEmail().trim());
        }

        feedbackRepository.save(feedback);
    }
}
