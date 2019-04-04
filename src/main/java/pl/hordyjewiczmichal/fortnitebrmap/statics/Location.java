package pl.hordyjewiczmichal.fortnitebrmap.statics;


import lombok.Getter;

public enum Location
{
    /* NAMED LOCATIONS */
    TILTED_TOWERS("Tilted Towers"),
    JUNK_JUNCTION("Junk Junction"),
    HAPPY_HAMLET("Happy Hamlet"),
    THE_BLOCK("The Block"),

    /* UNNAMED LOCATIONS */
    VOLCANO("Volcano");

    @Getter
    private String name;


    Location(String name)
    {
        this.name = name;
    }
}
