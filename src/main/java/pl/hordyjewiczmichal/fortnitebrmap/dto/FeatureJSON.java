package pl.hordyjewiczmichal.fortnitebrmap.dto;

import com.fasterxml.jackson.databind.ObjectMapper;
import com.fasterxml.jackson.databind.node.ObjectNode;
import lombok.Data;

@Data
public class FeatureJSON
{
    private String type = "Feature";
    private ObjectNode properties = new ObjectMapper().createObjectNode(); // produces {}
    private GeometryJSON geometry = new GeometryJSON();
}
