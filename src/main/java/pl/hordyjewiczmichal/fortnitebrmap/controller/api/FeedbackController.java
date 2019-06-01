package pl.hordyjewiczmichal.fortnitebrmap.controller.api;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.*;
import pl.hordyjewiczmichal.fortnitebrmap.dto.FeedbackDTO;
import pl.hordyjewiczmichal.fortnitebrmap.service.FeedbackService;

@RestController
@RequestMapping("/api/feedback")
public class FeedbackController
{
    @Autowired
    protected FeedbackService feedbackService;

    /* POST MAPPINGS */
    @PostMapping
    @ResponseStatus(HttpStatus.CREATED)
    public void saveFeedback(@RequestBody FeedbackDTO feedbackDTO)
    {
        feedbackService.saveFeedback(feedbackDTO);
    }
}
