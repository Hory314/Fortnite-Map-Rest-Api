package pl.hordyjewiczmichal.fortnitebrmap.dto;

import lombok.Data;

@Data
public class GeometryJSON
{
    private String type = "Point";
    private String[] coordinates = new String[2];


    public GeometryJSON(String lat, String lng)
    {
        this.coordinates[0] = lng;
        this.coordinates[1] = lat;
    }

    public GeometryJSON(String type, String lat, String lng)
    {
        this.type = type;
        this.coordinates[0] = lng;
        this.coordinates[1] = lat;
    }

    public GeometryJSON()
    {
    }
}
