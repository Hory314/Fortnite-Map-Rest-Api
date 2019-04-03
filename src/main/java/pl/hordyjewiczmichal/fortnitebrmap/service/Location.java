package pl.hordyjewiczmichal.fortnitebrmap.service;

public enum Location
{
    /* NAMED LOCATIONS */
    TILTED_TOWERS("Tilted Towers"),

    THE_BLOCK("The Block"),

    /* UNNAMED LOCATIONS */
    VOLCANO("Volcano");

    private String name;


    Location(String name)
    {
        this.name = name;
    }

    @Override
    public String toString()
    {
        return this.name;
    }
}
