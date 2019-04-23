const ELEMENT_ID = "fnbr_map";
const MAP_VERSION = "8.20";
const API_URL = "http://localhost:8080/api/";
// const API_URL = "api/";
const ITEMS = // comment property to prevent showing it in layers
    {
        chest: {
            url: "chests",
            name: "Chests",
            icon: L.icon({
                iconUrl: 'images/icons/chest.png',
                iconSize: [32, 32],
                iconAnchor: [16, 16],
                popupAnchor: [0, -16]
            })
        },
        floorLoot: {
            url: "floor-loot",
            name: "Floor Loot",
            icon: L.icon({
                iconUrl: 'images/icons/unknown.png',
                iconSize: [32, 32],
                iconAnchor: [16, 16],
                popupAnchor: [0, -16]
            })
        },
        ammoBox: {
            url: "ammo-boxes",
            name: "Ammo Boxes",
            icon: L.icon({
                iconUrl: 'images/icons/unknown.png',
                iconSize: [32, 32],
                iconAnchor: [16, 16],
                popupAnchor: [0, -16]
            })
        },
        vendingMachine: {
            url: "vending-machines",
            name: "Vending Machines",
            icon: L.icon({
                iconUrl: 'images/icons/vending-machine.png',
                iconSize: [25, 32],
                iconAnchor: [12.5, 16],
                popupAnchor: [0, -16]
            })
        },

        // shoppingCart: {
        //     url: "shopping-carts",
        //     name: "Shopping Carts",
        //     icon: L.icon({
        //         iconUrl: 'images/icons/unknown.png',
        //         iconSize: [32, 32],
        //         iconAnchor: [16, 16],
        //         popupAnchor: [0, -16]
        //     })
        // },
        // allTerrainKart: {
        //     url: "atks",
        //     name: "ATKs",
        //     icon: L.icon({
        //         iconUrl: 'images/icons/unknown.png',
        //         iconSize: [32, 32],
        //         iconAnchor: [16, 16],
        //         popupAnchor: [0, -16]
        //     })
        // },
        quadcrasher: {
            url: "quadcrashers",
            name: "Quadcrashers",
            icon: L.icon({
                iconUrl: 'images/icons/unknown.png',
                iconSize: [32, 32],
                iconAnchor: [16, 16],
                popupAnchor: [0, -16]
            })
        },
        // plane: {
        //     url: "planes",
        //     name: "Planes",
        //     icon: L.icon({
        //         iconUrl: 'images/icons/unknown.png',
        //         iconSize: [32, 32],
        //         iconAnchor: [16, 16],
        //         popupAnchor: [0, -16]
        //     })
        // },
        driftBoard: {
            url: "drift-boards",
            name: "Drift Boards",
            icon: L.icon({
                iconUrl: 'images/icons/unknown.png',
                iconSize: [32, 32],
                iconAnchor: [16, 16],
                popupAnchor: [0, -16]
            })
        },
        pirateCannon: {
            url: "pirate-cannons",
            name: "Pirate Cannons",
            icon: L.icon({
                iconUrl: 'images/icons/unknown.png',
                iconSize: [32, 32],
                iconAnchor: [16, 16],
                popupAnchor: [0, -16]
            })
        },
        baller: {
            url: "ballers",
            name: "Ballers",
            icon: L.icon({
                iconUrl: 'images/icons/unknown.png',
                iconSize: [32, 32],
                iconAnchor: [16, 16],
                popupAnchor: [0, -16]
            })
        },

        // hopRock: {
        //     url: "hop-rocks",
        //     name: "Hop Rocks",
        //     icon: L.icon({
        //         iconUrl: 'images/icons/unknown.png',
        //         iconSize: [32, 32],
        //         iconAnchor: [16, 16],
        //         popupAnchor: [0, -16]
        //     })
        // },
        mushroom: {
            url: "mushrooms",
            name: "Mushrooms",
            icon: L.icon({
                iconUrl: 'images/icons/unknown.png',
                iconSize: [32, 32],
                iconAnchor: [16, 16],
                popupAnchor: [0, -16]
            })
        },
        apple: {
            url: "apples",
            name: "Apples",
            icon: L.icon({
                iconUrl: 'images/icons/unknown.png',
                iconSize: [32, 32],
                iconAnchor: [16, 16],
                popupAnchor: [0, -16]
            })
        },
        banana: {
            url: "bananas",
            name: "Bananas",
            icon: L.icon({
                iconUrl: 'images/icons/unknown.png',
                iconSize: [32, 32],
                iconAnchor: [16, 16],
                popupAnchor: [0, -16]
            })
        },
        coconut: {
            url: "coconuts",
            name: "Coconuts",
            icon: L.icon({
                iconUrl: 'images/icons/unknown.png',
                iconSize: [32, 32],
                iconAnchor: [16, 16],
                popupAnchor: [0, -16]
            })
        },
        pepper: {
            url: "peppers",
            name: "Peppers",
            icon: L.icon({
                iconUrl: 'images/icons/unknown.png',
                iconSize: [32, 32],
                iconAnchor: [16, 16],
                popupAnchor: [0, -16]
            })
        },
        // shadowStone: {
        //     url: "shadow-stones",
        //     name: "Shadow Stones",
        //     icon: L.icon({
        //         iconUrl: 'images/icons/unknown.png',
        //         iconSize: [32, 32],
        //         iconAnchor: [16, 16],
        //         popupAnchor: [0, -16]
        //     })
        // },

        campfire: {
            url: "campfires",
            name: "Campfires",
            icon: L.icon({
                iconUrl: 'images/icons/unknown.png',
                iconSize: [32, 32],
                iconAnchor: [16, 16],
                popupAnchor: [0, -16]
            })
        },
        rift: {
            url: "rifts",
            name: "Rifts",
            icon: L.icon({
                iconUrl: 'images/icons/unknown.png',
                iconSize: [32, 32],
                iconAnchor: [16, 16],
                popupAnchor: [0, -16]
            })
        },
        geyser: {
            url: "geysers",
            name: "Geysers",
            icon: L.icon({
                iconUrl: 'images/icons/unknown.png',
                iconSize: [32, 32],
                iconAnchor: [16, 16],
                popupAnchor: [0, -16]
            })
        },
        teleporter: {
            url: "teleporters",
            name: "Teleporters",
            icon: L.icon({
                iconUrl: 'images/icons/unknown.png',
                iconSize: [32, 32],
                iconAnchor: [16, 16],
                popupAnchor: [0, -16]
            }),
            options: {
                color: "#3388ff",
                width: 3
            }
        },
        zipline: {
            url: "ziplines",
            name: "Ziplines",
            icon: L.icon({
                iconUrl: 'images/icons/unknown.png',
                iconSize: [32, 32],
                iconAnchor: [16, 16],
                popupAnchor: [0, -16]
            }),
            options: {
                color: "#000000",
                width: 3,
                dashArray: "3 3"
            }
        },
        rebootVan: {
            url: "reboot-vans",
            name: "Reboot Vans",
            icon: L.icon({
                iconUrl: 'images/icons/reboot-van.png',
                iconSize: [32, 32],
                iconAnchor: [16, 24],
                popupAnchor: [0, -16]
            })
        }
    };
const MAP_SHIFT = 70; // adjust this value to determine map center
const MAP_WIDTH = 2500 + MAP_SHIFT;
const MAP_HEIGHT = 2500 + MAP_SHIFT;
const MAP_BOUNDS = [[(MAP_HEIGHT / -2) + MAP_SHIFT, (MAP_WIDTH / -2)], [(MAP_HEIGHT / 2) + MAP_SHIFT, (MAP_WIDTH / 2)]];

function initMap(elementId)
{
    /* calculate divHeight for map initial zoom */
    let brMapEl = window.getComputedStyle(document.getElementById(elementId));
    let divHeight = brMapEl.height.replace("px", "").replace("%", "");

    let battleRoyaleMap = L.map(elementId, {
        crs: L.CRS.Simple,
        minZoom: Math.log2(MAP_HEIGHT / divHeight) * (-1),
        maxZoom: Math.log2(MAP_HEIGHT / divHeight) * (-1) + 4,
        center: [0, 0],
        zoom: Math.log2(MAP_HEIGHT / divHeight) * (-1),
        maxBounds: MAP_BOUNDS,
        zoomDelta: 0.25,
        zoomSnap: 0,
        wheelPxPerZoomLevel: 50,
        wheelDebounceTime: 20,
        attributionControl: false,
        zoomControl: false,
        // dragging: !L.Browser.mobile, // disable 1 finger map moving
        zoomTouch: true
    });

    L.control.attribution({prefix: "&copy; <a>Hory314</a>", position: "bottomright"}).addTo(battleRoyaleMap);

    // image file
    L.imageOverlay(`images/maps/${MAP_VERSION}/full.jpg`, MAP_BOUNDS).addTo(battleRoyaleMap);

    return battleRoyaleMap;
}

function initGridOverlay(map)
{
    let gridOverlay = L.layerGroup();

    let gridOptions =
        {
            color: 'white',
            weight: 1,
            opacity: 0.3,
            lineCap: 'butt',
            lineJoin: 'bevel',
            interactive: false,
            noClip: true
        };

    // horizontal and vertical lines
    for (let i = -1250; i <= 1250; i += 250)
    {
        L.polyline([L.latLng(-1250, i), L.latLng(1250, i)], gridOptions).addTo(gridOverlay);
        L.polyline([L.latLng(i, -1250), L.latLng(i, 1250)], gridOptions).addTo(gridOverlay);
    }

    // coordinates
    let coordsOptions =
        {
            color: 'rgb(41, 49, 69)',
            weight: 0,
            fillOpacity: 1,
            interactive: false,
            noClip: true
        };
    L.rectangle([L.latLng(1250, -1250 - 35), L.latLng(1250 + 70 + 35, 1250)], coordsOptions).addTo(gridOverlay);
    L.rectangle([L.latLng(1250, -1250 - 35), L.latLng(-1250 + 35, -1250 + 70 - 35)], coordsOptions).addTo(gridOverlay);

    // A-J 1-10
    for (let i = -5; i < 5; i++)
    {
        let divIconLetters = L.divIcon({className: 'coords-div-icon', html: ""});
        let divIconNumbers = L.divIcon({className: 'coords-div-icon', html: ""});

        divIconLetters["options"]["html"] = String.fromCharCode(65 + i + 5);
        L.marker([-5 * 250 * (-1) + 60, (i * 250) + 250 / 2], {icon: divIconLetters}).addTo(gridOverlay);
        divIconNumbers["options"]["html"] = i + 6;
        L.marker([i * 250 * (-1) - 220 / 2, (-5 * 250) - 10], {icon: divIconNumbers}).addTo(gridOverlay);
    }

    gridOverlay.addTo(map); // show grid by default

    return gridOverlay;
}

function addJsonToOverlays(map)
{
    let overlays = {};

    let first = true;
    for (let item in ITEMS)
    {
        let newItemOverlay = L.layerGroup();
        ajax(API_URL + ITEMS[item]['url'], 'GET', function (geoJson)
        {
            L.geoJSON(geoJson, {
                pointToLayer: (geoJsonPoint, latlng) => L.marker(latlng, {icon: ITEMS[item]["icon"]}),
                style: () => ITEMS[item]["options"]
            }).addTo(newItemOverlay);
        });

        if (first) // check 1st layer by default
        {
            newItemOverlay.addTo(map);
            first = false;
        }

        overlays[ITEMS[item]['name']] = newItemOverlay;
    }

    return overlays;
}

function ajax(url, method, successFunction)
{
    $.ajax({
        url: url,
        type: method
    })
        .done(function (data)
        {
            successFunction(data);
        });
}

function customizeLayersBox(map, overlays)
{
    let layersBox = L.control.layers({}, overlays, {collapsed: true}).addTo(map);
    let layersBoxEl = layersBox.getContainer();
    layersBoxEl.style.top = "23px";
    layersBoxEl.style.right = "0px";
}

function customizeZoomButton(map)
{
    let zoomControl = L.control.zoom({position: 'topleft'}).addTo(map);
    let zoomControlEl = zoomControl.getContainer();
    zoomControlEl.style.top = "23px";
    zoomControlEl.style.left = "12px";
}

function addContextMenu(elementId, leafletMap)
{
    /* INIT */
    let map = $(`#${elementId}`); // disable right-click context menu

    let menu = $("<div id='map-menu'>");
    menu.css("min-width", "200px");
    menu.css("background-color", "#FFF");
    menu.css("display", "none");
    menu.css("position", "relative");
    menu.css("z-index", "9999999");
    menu.css("box-shadow", "rgba(187, 187, 187, 0.8) 2px 2px 3px 0px");

    let addAnchor = $(`<a href='#${new Date().getTime()}'>Dodaj punkt</a>`);
    addAnchor.css("display", "block");

    menu.append(addAnchor);
    map.append(menu);
    /* */

    /* EVENTS */
    let newPoint;

    map.on("contextmenu", (e) =>
    {
        e.preventDefault();
        menu.css("top", e.pageY);
        menu.css("left", e.pageX);
        menu.css("display", "inline-block");

        let latlng = leafletMap.mouseEventToLatLng(e.originalEvent);
        newPoint = [Math.round(latlng.lat * 1000000) / 1000000, Math.round(latlng.lng * 1000000) / 1000000];
    });

    addAnchor.on("mousedown", (e) =>
    {
        e.stopPropagation(); // prevent mousedown on map (otherwise mousedown
                             // event on map will fire and hide menu first, preventing click event on anchor)
    });


    addAnchor.on("click", () =>
    {
        menu.css("display", "none"); // after click, hide menu, and proceed with points...
        console.log("POST send with points: " + newPoint[0] + " and " + newPoint[1]);

        showNewPointDiv();

        // content below to function above
        let chestData = {
            lat: newPoint[0],
            lng: newPoint[1],
            location: null,
            link: null
        };

        $.ajax({
            url: API_URL + ITEMS["chest"]["url"],
            type: "POST",
            data: JSON.stringify(chestData),
            dataType: "json",
            contentType: 'application/json'
        })
            .done(function (data)
            {
                // do nothing
                console.log('wyslano posta');
            });
    });

    map.on("mousedown wheel", () =>
    {
        menu.css("display", "none"); // hide menu on dragging or scrolling
    });

    function showNewPointDiv()
    {
        // TODO: continue work on menu
        let newPointDiv = $("<div id='new-point'>");

        newPointDiv.css("position", "fixed").css("width", "200px").css("height", "300px").css("background-color", "gray").css("bottom", "25px").css("right", "25px").css("z-index", "9999");
        map.append(newPointDiv);
    }
}

document.addEventListener("DOMContentLoaded", () =>
{
    /* init map */
    let battleRoyaleMap = initMap(ELEMENT_ID);

    /* init grid */
    let gridOverlay = initGridOverlay(battleRoyaleMap);

    /* load JSONs*/
    let overlays = addJsonToOverlays(battleRoyaleMap);
    overlays['Map grid'] = gridOverlay; // add grid to overlays (as last entry)

    /* customize layers box */
    customizeLayersBox(battleRoyaleMap, overlays);

    /* customize zoom button */
    customizeZoomButton(battleRoyaleMap);

    /* add context menu */
    addContextMenu(ELEMENT_ID, battleRoyaleMap);
});
