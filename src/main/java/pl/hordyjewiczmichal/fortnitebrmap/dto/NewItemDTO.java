package pl.hordyjewiczmichal.fortnitebrmap.dto;

import lombok.Data;

@Data
public class NewItemDTO
{
    private double lat = 0;

    private double lng = 0;

    private String location = "";

    private String type = "";

    private String link = ""; // int, String, Item ?
}
