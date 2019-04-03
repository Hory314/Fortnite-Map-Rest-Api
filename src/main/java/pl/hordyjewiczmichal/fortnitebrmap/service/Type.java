package pl.hordyjewiczmichal.fortnitebrmap.service;

public enum Type
{
    /* LOOT */
    CHEST("chest"),
    FLOOR_LOOT("floor_loot"),
    AMMO_BOX("ammo_box"),
    VENDING_MACHINE("vending_machine"),

    /* VEHICLES */
    SHOPPING_CART("shopping_cart"),
    ALL_TERRAIN_KART("atk"),
    QUADCRASHER("quadcrasher"),
    X4_STORMWING("plane"),
    DRIFT_BOARD("drift_board"),
    PIRATE_CANNON("pirate_cannon"),
    BALLER("baller"),

    /* CONSUMABLES */
    HOP_ROCK("hop_rock"),
    MUSHROOM("mushroom"),
    APPLE("apple"),
    BANANA("banana"),
    COCONUT("coconut"),
    PEPPER("pepper"),

    /* UTILITIES */
    COZY_CAMPFIRE("campfire"),
    RIFT("rift"),
    VOLCANIC_VENTS("geyser"),
    TELEPORTER("teleporter"), /* line! */
    ZIPLINE("zipline"); /* line! */


    private String name;


    Type(String name)
    {
        this.name = name;
    }
}
