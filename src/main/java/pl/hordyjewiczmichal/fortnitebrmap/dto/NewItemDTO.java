package pl.hordyjewiczmichal.fortnitebrmap.dto;

import lombok.Data;

@Data
public class NewItemDTO
{
    private double lat = 0;

    private double lng = 0;

    private String location = "";

    private Long link = null; // int, String, Item ?
}
