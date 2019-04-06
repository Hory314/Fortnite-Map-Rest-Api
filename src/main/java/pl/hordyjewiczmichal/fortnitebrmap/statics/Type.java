package pl.hordyjewiczmichal.fortnitebrmap.statics;

import lombok.Getter;

public enum Type
{
    /* LOOT */
    CHEST("Chest"),
    FLOOR_LOOT("Floor Loot"),
    AMMO_BOX("Ammo Box"),
    VENDING_MACHINE("Vending Machine"),

    /* VEHICLES */
    SHOPPING_CART("Shopping Cart"),
    ALL_TERRAIN_KART("ATK"),
    QUADCRASHER("Quadcrasher"),
    X4_STORMWING("Plane"),
    DRIFT_BOARD("Drift Board"),
    PIRATE_CANNON("Pirate Cannon"),
    BALLER("Baller"),

    /* CONSUMABLES */
    HOP_ROCK("Hop Rock"),
    MUSHROOM("Mushroom"),
    APPLE("Apple"),
    BANANA("Banana"),
    COCONUT("Coconut"),
    PEPPER("Pepper"),

    /* UTILITIES */
    COZY_CAMPFIRE("Campfire"),
    RIFT("Rift"),
    VOLCANIC_VENT("Geyser"),
    TELEPORTER("Teleporter"), /* line! */
    ZIPLINE("Zipline"), /* line! */
    REBOOT_VAN("Reboot Van");

    @Getter
    private String friendlyName;


    Type(String friendlyName)
    {
        this.friendlyName = friendlyName;
    }
}
