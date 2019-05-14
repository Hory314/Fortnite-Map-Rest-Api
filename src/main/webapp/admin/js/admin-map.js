const ELEMENT_ID = "fnbr_map";
const MAP_VERSION = "9.00";
const TILE_MAP_URL_TEMPLATE = "{z}/{x}/{y}.jpg";
const API_URL = "http://localhost:8080/api/";
// const API_URL = "api/";
const MAP_WIDTH = 2500;
const MAP_HEIGHT = 2500;
const MAP_SCALE_FIX = 120;
const MAP_BOUNDS = [[-MAP_HEIGHT / 2 - MAP_SCALE_FIX / 2, -MAP_WIDTH / 2 - MAP_SCALE_FIX / 2], [MAP_HEIGHT / 2 + MAP_SCALE_FIX / 2, MAP_WIDTH / 2 + MAP_SCALE_FIX / 2]];
const MAX_ZOOM = 5;
const MIN_ZOOM = 2;


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
        },
        fortbyte: {
            url: "fortbytes",
            name: "Fortbytes",
            icon: L.icon({
                iconUrl: 'images/icons/unknown.png',
                iconSize: [32, 32],
                iconAnchor: [16, 24],
                popupAnchor: [0, -16]
            })
        }
    };


function initMap(elementId)
{
    /* calculate divHeight for map initial zoom */
    let brMapEl = window.getComputedStyle(document.getElementById(elementId));
    let divHeight = brMapEl.height.replace("px", "").replace("%", "");

    // define custom CRS for Fortnite map
    let FortniteMapCRS = L.extend({}, L.CRS.Simple, {
        projection: L.Projection.LonLat,
        transformation: (function ()
        {
            return new L.Transformation(1 / (MAP_WIDTH + MAP_SCALE_FIX), 0.5, -1 / (MAP_HEIGHT + MAP_SCALE_FIX), 0.5)
        }()),
        scale: function (zoom)
        {
            return 256 * Math.pow(2, zoom);
        }
    });

    // let battleRoyaleMap = L.map(elementId, {
    //     crs: L.CRS.Simple,
    //     minZoom: Math.log2(MAP_HEIGHT / divHeight) * (-1),
    //     maxZoom: Math.log2(MAP_HEIGHT / divHeight) * (-1) + 4,
    //     center: [0, 0],
    //     zoom: Math.log2(MAP_HEIGHT / divHeight) * (-1),
    //     maxBounds: MAP_BOUNDS,
    //     zoomDelta: 0.25,
    //     zoomSnap: 0,
    //     wheelPxPerZoomLevel: 50,
    //     wheelDebounceTime: 20,
    //     attributionControl: false,
    //     zoomControl: false,
    //     // dragging: !L.Browser.mobile, // disable 1 finger map moving
    //     zoomTouch: true
    // });

    var battleRoyaleMap = L.map(elementId, {
        crs: FortniteMapCRS,
        maxBounds: MAP_BOUNDS,
        zoomControl: false,
        attributionControl: false,
        // dragging: !L.Browser.mobile, // disable 1 finger map moving
        zoomTouch: true,
        renderer: L.svg({padding: 100}) // line, circles, rectangles etc. won't disappeared if out of sight
    }).setView([0, 0], MIN_ZOOM);


    L.control.attribution({prefix: "&copy; <a>Hory314</a>", position: "bottomright"}).addTo(battleRoyaleMap);

    // map tiles
    L.tileLayer(`images/maps/${MAP_VERSION}/` + TILE_MAP_URL_TEMPLATE, {
        maxZoom: MAX_ZOOM,
        minZoom: MIN_ZOOM,
        tms: false,
        noWrap: true,
        bounds: MAP_BOUNDS, // unnecessary tiles are not loaded if bounds are set
        keepBuffer: 32, // # of saved tiles (until zoom)
        updateInterval: 50, // 50 ms, default 200 ms
    }).addTo(battleRoyaleMap);

    /*coords test*/
    var popup = L.popup();

    function onMapClick(e)
    {
        popup
            .setLatLng(e.latlng)
            .setContent("You clicked the map at " + e.latlng.toString())
            .openOn(battleRoyaleMap);
    }

    battleRoyaleMap.on('click', onMapClick);

    /**/

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

    // coordinates bars
    let coordsOptions =
        {
            color: 'rgb(41, 49, 69)',
            weight: 0,
            fillOpacity: 1,
            interactive: false,
            noClip: true
        };
    L.rectangle([L.latLng(1250, -1250 - 60), L.latLng(1250 + 60, 1250)], coordsOptions).addTo(gridOverlay);
    L.rectangle([L.latLng(1250, -1250), L.latLng(-1250, -1250 - 60)], coordsOptions).addTo(gridOverlay);

    // A-J 1-10
    for (let i = -5; i < 5; i++)
    {
        let divIconLetters = L.divIcon({
            className: 'coords-div-icon',
            html: "",
            iconSize: [24, 24],
            iconAnchor: [12, 12]
        });
        let divIconNumbers = L.divIcon({
            className: 'coords-div-icon',
            html: "",
            iconSize: [24, 24],
            iconAnchor: [12, 12]
        });

        divIconLetters["options"]["html"] = String.fromCharCode(65 + i + 5);
        L.marker([-5 * 250 * (-1) + 20, (i * 250) + 250 / 2], {
            icon: divIconLetters,
            interactive: false
        }).addTo(gridOverlay);
        divIconNumbers["options"]["html"] = i + 6;
        L.marker([i * 250 * (-1) - 260 / 2, (-5 * 250) - 30], {
            icon: divIconNumbers,
            interactive: false
        }).addTo(gridOverlay);
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
        $.ajax({
            url: API_URL + ITEMS[item]['url'],
            type: 'GET'
        })
            .done(function (geoJson)
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
    /* ELEMENTS */
    let map = $(`#${elementId}`);
    let newPointDiv = $("div#new-point");
    let crosshair = $("#crosshair");
    let cancelBtn = newPointDiv.find(".close-btn");
    let form = newPointDiv.find("form");
    let infoBox = $("#error-box");

    /* INIT */
    let menu = $("#map-menu");

    let addAnchor = $(`<a href='#'>Add point</a>`); // menu's 1st option
    addAnchor.css("display", "block");
    menu.append(addAnchor);

    // init select options
    for (let item in ITEMS)
    {
        form.find("select")
            .append(
                $(`<option value="${ITEMS[item]["url"]}">`).attr("data-item-type", item).text(ITEMS[item]["name"])
            );
    }

    /* EVENTS */
    let newPoint;

    map.on("contextmenu", (e) =>
    {
        e.preventDefault(); // disable right-click context menu
        let menuWidth = menu.outerWidth(true); // full computed with include margin(true)
        let menuHeight = menu.outerHeight(true); // full computed with include margin(true)
        let clientWidth = $(window).width();
        let clientHeight = $(window).height();

        menu.css("left", e.pageX > clientWidth - menuWidth ? clientWidth - menuWidth : e.pageX); // move if to close to the edge
        menu.css("top", e.pageY > clientHeight - menuHeight ? clientHeight - menuHeight : e.pageY); // move if to close to the bottom
        menu.css("display", "inline-block"); // show menu

        crosshair.css("left", e.pageX); // place crosshair on click point
        crosshair.css("top", e.pageY);
        crosshair.css("display", "block");


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

        let f = form.find("input:first-child");
        $(f.get(0)).val(newPoint[0]);
        $(f.get(1)).val(newPoint[1]);

        newPointDiv.css("right", "0"); // show div with form
    });

    map.on("mousedown wheel", () =>
    {
        menu.css("display", "none"); // hide menu on dragging or scrolling
        crosshair.css("display", "none"); // hide crosshair as well
        newPointDiv.css("right", "-285px"); // hide form div
        form.find("select option:first-of-type").prop("selected", true); // select empty option if div closed
    });

    cancelBtn.on("click", (e) =>
    {
        $(e.target).parent().css("right", "-285px"); // hide div on close button click / $(this) doesn't work
    });

    form.on("submit", (e) =>
    {
        e.preventDefault();

        let itemData = {
            lat: newPoint[0],
            lng: newPoint[1],
            location: null,
            link: null
        };

        let itemURL = form.find("select option:selected").attr("value");
        if (itemURL === undefined || itemURL === "")
        {
            showInfo(infoBox, "Error: Please select item type");
            return;
        }

        $.ajax({ // FIXME: OPTIONS method request while sending post (only in IDE debug plugin, so?...)
            url: API_URL + itemURL,
            type: "POST",
            data: JSON.stringify(itemData),
            dataType: "json", // must be text if POST doesn't return json
            contentType: "application/json"
        })
            .done(function (geoJson)
            { // success
                console.log("success");
                let itemType = form.find("select option:selected").attr("data-item-type");

                L.geoJSON(geoJson, {
                    pointToLayer: (geoJsonPoint, latlng) => L.marker(latlng, {
                        icon: L.icon({
                            iconUrl: ITEMS[itemType]["icon"]["options"]["iconUrl"],
                            iconSize: ITEMS[itemType]["icon"]["options"]["iconSize"],
                            iconAnchor: ITEMS[itemType]["icon"]["options"]["iconAnchor"],
                            popupAnchor: ITEMS[itemType]["icon"]["options"]["popupAnchor"],
                            className: "grayed-out"
                        })
                    }),
                    style: () => ITEMS[itemType]["options"]
                }).addTo(leafletMap);
            })
            .fail(function (xhr, textStatus, errorThrown)
            { // fail
                let errorJSON = JSON.parse(xhr.responseText);
                let errorMsg;
                if (errorJSON["status"] === undefined)
                {
                    errorMsg = `${errorThrown}`;
                }
                else
                {
                    errorMsg = `Error occurred: ${errorJSON["status"]} ${errorJSON["error"]}<br>${errorThrown}`;
                }

                showInfo(infoBox, errorMsg);
            })
            .always(function ()
            { // finally
                crosshair.css("display", "none"); // hide crosshair
                newPointDiv.css("right", "-285px"); // hide form div
            });
    });

    /* FUNCTIONS */
    function showInfo(element, msg)
    {
        if (element.css("display") === "none")
        {
            element.html(msg).fadeIn(1000);
            setTimeout(() =>
            {
                element.fadeOut(4000);
            }, 6000); // show opacity 1.0 for 5s (+1s from fadeIn)
        }
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
