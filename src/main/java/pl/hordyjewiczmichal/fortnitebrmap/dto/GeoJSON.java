package pl.hordyjewiczmichal.fortnitebrmap.dto;

import lombok.Data;

import java.util.List;

@Data
public class GeoJSON
{
    private String type = "FeatureCollection";

    private List<FeatureJSON> features/* = new ArrayList<>()*/;
}
