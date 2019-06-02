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
let errorBox; // init after DOM content loaded
let locale;
let lastClickedMarker;
let lastNumber;


const ITEMS = // comment property to prevent showing it in layers
    {
        // chest: {
        //     url: "chests",
        //     name: "Chests",
        //     icon: L.icon({
        //         iconUrl: '../images/icons/chest.png',
        //         iconSize: [32, 32],
        //         iconAnchor: [16, 16],
        //         popupAnchor: [0, -16]
        //     })
        // },
        // floorLoot: {
        //     url: "floor-loot",
        //     name: "Floor Loot",
        //     icon: L.icon({
        //         iconUrl: 'images/icons/unknown.png',
        //         iconSize: [32, 32],
        //         iconAnchor: [16, 16],
        //         popupAnchor: [0, -16]
        //     })
        // },
        // ammoBox: {
        //     url: "ammo-boxes",
        //     name: "Ammo Boxes",
        //     icon: L.icon({
        //         iconUrl: 'images/icons/unknown.png',
        //         iconSize: [32, 32],
        //         iconAnchor: [16, 16],
        //         popupAnchor: [0, -16]
        //     })
        // },
        // vendingMachine: {
        //     url: "vending-machines",
        //     name: "Vending Machines",
        //     icon: L.icon({
        //         iconUrl: 'images/icons/vending-machine.png',
        //         iconSize: [25, 32],
        //         iconAnchor: [12.5, 16],
        //         popupAnchor: [0, -16]
        //     })
        // },
        //
        // // shoppingCart: {
        // //     url: "shopping-carts",
        // //     name: "Shopping Carts",
        // //     icon: L.icon({
        // //         iconUrl: 'images/icons/unknown.png',
        // //         iconSize: [32, 32],
        // //         iconAnchor: [16, 16],
        // //         popupAnchor: [0, -16]
        // //     })
        // // },
        // // allTerrainKart: {
        // //     url: "atks",
        // //     name: "ATKs",
        // //     icon: L.icon({
        // //         iconUrl: 'images/icons/unknown.png',
        // //         iconSize: [32, 32],
        // //         iconAnchor: [16, 16],
        // //         popupAnchor: [0, -16]
        // //     })
        // // },
        // quadcrasher: {
        //     url: "quadcrashers",
        //     name: "Quadcrashers",
        //     icon: L.icon({
        //         iconUrl: 'images/icons/unknown.png',
        //         iconSize: [32, 32],
        //         iconAnchor: [16, 16],
        //         popupAnchor: [0, -16]
        //     })
        // },
        // // plane: {
        // //     url: "planes",
        // //     name: "Planes",
        // //     icon: L.icon({
        // //         iconUrl: 'images/icons/unknown.png',
        // //         iconSize: [32, 32],
        // //         iconAnchor: [16, 16],
        // //         popupAnchor: [0, -16]
        // //     })
        // // },
        // driftBoard: {
        //     url: "drift-boards",
        //     name: "Drift Boards",
        //     icon: L.icon({
        //         iconUrl: 'images/icons/unknown.png',
        //         iconSize: [32, 32],
        //         iconAnchor: [16, 16],
        //         popupAnchor: [0, -16]
        //     })
        // },
        // pirateCannon: {
        //     url: "pirate-cannons",
        //     name: "Pirate Cannons",
        //     icon: L.icon({
        //         iconUrl: 'images/icons/unknown.png',
        //         iconSize: [32, 32],
        //         iconAnchor: [16, 16],
        //         popupAnchor: [0, -16]
        //     })
        // },
        // baller: {
        //     url: "ballers",
        //     name: "Ballers",
        //     icon: L.icon({
        //         iconUrl: 'images/icons/unknown.png',
        //         iconSize: [32, 32],
        //         iconAnchor: [16, 16],
        //         popupAnchor: [0, -16]
        //     })
        // },
        //
        // // hopRock: {
        // //     url: "hop-rocks",
        // //     name: "Hop Rocks",
        // //     icon: L.icon({
        // //         iconUrl: 'images/icons/unknown.png',
        // //         iconSize: [32, 32],
        // //         iconAnchor: [16, 16],
        // //         popupAnchor: [0, -16]
        // //     })
        // // },
        // mushroom: {
        //     url: "mushrooms",
        //     name: "Mushrooms",
        //     icon: L.icon({
        //         iconUrl: 'images/icons/unknown.png',
        //         iconSize: [32, 32],
        //         iconAnchor: [16, 16],
        //         popupAnchor: [0, -16]
        //     })
        // },
        // apple: {
        //     url: "apples",
        //     name: "Apples",
        //     icon: L.icon({
        //         iconUrl: 'images/icons/unknown.png',
        //         iconSize: [32, 32],
        //         iconAnchor: [16, 16],
        //         popupAnchor: [0, -16]
        //     })
        // },
        // banana: {
        //     url: "bananas",
        //     name: "Bananas",
        //     icon: L.icon({
        //         iconUrl: 'images/icons/unknown.png',
        //         iconSize: [32, 32],
        //         iconAnchor: [16, 16],
        //         popupAnchor: [0, -16]
        //     })
        // },
        // coconut: {
        //     url: "coconuts",
        //     name: "Coconuts",
        //     icon: L.icon({
        //         iconUrl: 'images/icons/unknown.png',
        //         iconSize: [32, 32],
        //         iconAnchor: [16, 16],
        //         popupAnchor: [0, -16]
        //     })
        // },
        // pepper: {
        //     url: "peppers",
        //     name: "Peppers",
        //     icon: L.icon({
        //         iconUrl: 'images/icons/unknown.png',
        //         iconSize: [32, 32],
        //         iconAnchor: [16, 16],
        //         popupAnchor: [0, -16]
        //     })
        // },
        // // shadowStone: {
        // //     url: "shadow-stones",
        // //     name: "Shadow Stones",
        // //     icon: L.icon({
        // //         iconUrl: 'images/icons/unknown.png',
        // //         iconSize: [32, 32],
        // //         iconAnchor: [16, 16],
        // //         popupAnchor: [0, -16]
        // //     })
        // // },
        //
        // campfire: {
        //     url: "campfires",
        //     name: "Campfires",
        //     icon: L.icon({
        //         iconUrl: 'images/icons/unknown.png',
        //         iconSize: [32, 32],
        //         iconAnchor: [16, 16],
        //         popupAnchor: [0, -16]
        //     })
        // },
        // rift: {
        //     url: "rifts",
        //     name: "Rifts",
        //     icon: L.icon({
        //         iconUrl: 'images/icons/unknown.png',
        //         iconSize: [32, 32],
        //         iconAnchor: [16, 16],
        //         popupAnchor: [0, -16]
        //     })
        // },
        // geyser: {
        //     url: "geysers",
        //     name: "Geysers",
        //     icon: L.icon({
        //         iconUrl: 'images/icons/unknown.png',
        //         iconSize: [32, 32],
        //         iconAnchor: [16, 16],
        //         popupAnchor: [0, -16]
        //     })
        // },
        // teleporter: {
        //     url: "teleporters",
        //     name: "Teleporters",
        //     icon: L.icon({
        //         iconUrl: 'images/icons/unknown.png',
        //         iconSize: [32, 32],
        //         iconAnchor: [16, 16],
        //         popupAnchor: [0, -16]
        //     }),
        //     options: {
        //         color: "#3388ff",
        //         width: 3
        //     }
        // },
        // zipline: {
        //     url: "ziplines",
        //     name: "Ziplines",
        //     icon: L.icon({
        //         iconUrl: 'images/icons/unknown.png',
        //         iconSize: [32, 32],
        //         iconAnchor: [16, 16],
        //         popupAnchor: [0, -16]
        //     }),
        //     options: {
        //         color: "#000000",
        //         width: 3,
        //         dashArray: "3 3"
        //     }
        // },
        // rebootVan: {
        //     url: "reboot-vans",
        //     name: "Reboot Vans",
        //     icon: L.icon({
        //         iconUrl: 'images/icons/reboot-van.png',
        //         iconSize: [32, 32],
        //         iconAnchor: [16, 24],
        //         popupAnchor: [0, -16]
        //     })
        // },
        fortbyte: {
            url: "fortbytes",
            name: "Fortbyte",
            icon: L.icon({
                iconUrl: '../images/icons/fortbyte.png',
                iconSize: [32, 32],
                iconAnchor: [16, 12],
                popupAnchor: [0, -16]
            })
        }
    };

function setCookie(cname, cvalue, exdays)
{
    let d = new Date();
    d.setTime(d.getTime() + (exdays * 24 * 60 * 60 * 1000));
    let expires = "expires=" + d.toUTCString();
    document.cookie = cname + "=" + cvalue + "; " + expires + "; path=/";
}

function getCookie(cname)
{
    let name = cname + "=";
    let ca = document.cookie.split(';');
    for (let i = 0; i < ca.length; i++)
    {
        let c = ca[i];
        while (c.charAt(0) === ' ') c = c.substring(1);
        if (c.indexOf(name) === 0) return c.substring(name.length, c.length);
    }
    return "";
}

function recalculateProgress()
{
    // load cookie
    let completedCookie = getCookie("completed");

    let completedArray = [];
    if (completedCookie !== "") completedArray = JSON.parse(completedCookie);
    completedArray = completedArray.filter((el, i, arr) => arr.indexOf(el) === i);

    // remaining fortbytes cookie
    let remainingCookie = getCookie("remaining_fortbytes");

    let remainingArray = [];
    if (remainingCookie !== "") remainingArray = JSON.parse(remainingCookie);
    remainingArray = remainingArray.filter((el, i, arr) => arr.indexOf(el) === i);

    let progress = ((completedArray.length + remainingArray.length) * 100 / 100) + "%";

    $(".progress-bar div:nth-child(1) > span").text(progress);
    $(".progress-bar div:nth-child(2) > div").css("width", progress);
}

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


    L.control.attribution({
        prefix: "&copy; <a style='cursor: default;'>Hory314</a>",
        position: "bottomright"
    }).addTo(battleRoyaleMap);
    L.control.attribution({
        prefix: "<a href='#feedback' data-lity>Feedback</a>",
        position: "bottomright"
    }).addTo(battleRoyaleMap);

    // map tiles
    L.tileLayer(`../images/maps/${MAP_VERSION}/` + TILE_MAP_URL_TEMPLATE, {
        maxZoom: MAX_ZOOM,
        minZoom: MIN_ZOOM,
        tms: false,
        noWrap: true,
        bounds: MAP_BOUNDS, // unnecessary tiles are not loaded if bounds are set
        keepBuffer: 32, // # of saved tiles (until zoom)
        updateInterval: 50, // 50 ms, default 200 ms
    }).addTo(battleRoyaleMap);

    /*coords test*/
    // var popup = L.popup();
    //
    // function onMapClick(e)
    // {
    //     popup
    //         .setLatLng(e.latlng)
    //         .setContent("You clicked the map at " + e.latlng.toString())
    //         .openOn(battleRoyaleMap);
    // }
    //
    // battleRoyaleMap.on('click', onMapClick);

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
                    pointToLayer: (feature, latlng) =>
                    {
                        let newMarker = L.marker(latlng, {
                            icon: ITEMS[item]["icon"],
                            id: feature.properties["id"],
                            riseOnHover: true
                        });

                        // load opacities from cookie
                        let completedCookie = getCookie("completed");

                        let completedArray = [];
                        if (completedCookie !== "") completedArray = JSON.parse(completedCookie);

                        if ((completedArray.indexOf(newMarker["options"]["id"])) > -1)
                        {
                            newMarker.setOpacity(0.6);
                        }

                        newMarker.on("click", () =>
                        {
                            let popup = $("#popup");
                            let completionCheckbox = popup.find("form input[type=checkbox]"); // checkbox el
                            popup.css("display", "block"); // display popup on click
                            popup.find("div:nth-child(2) span").text(""); // reset desc
                            popup.find("div:nth-child(2) img").attr("src", ""); // reset image

                            popup.find("div:first-child img").attr("src", ITEMS[item]["icon"]["options"]["iconUrl"]); // set icon
                            if (lastClickedMarker !== undefined)
                            {
                                $(lastClickedMarker.getElement()).removeClass("active"); // remove active class from last clicked marker
                            }
                            $(newMarker.getElement()).addClass("active"); // set clicked marker as active (pulse effect)

                            let completedCookie = getCookie("completed"); // get cookie...

                            let completedArray = [];
                            if (completedCookie !== "") completedArray = JSON.parse(completedCookie); // ... and define array on every click
                            completionCheckbox[0].checked = (completedArray.indexOf(feature.properties["id"])) > -1;  // check checkbox if id present in cookie

                            let title;
                            if (feature.properties["number"] !== undefined)  // define title
                            {
                                title = `#${feature.properties["number"]} ${ITEMS[item]["name"]}`;
                            }
                            else
                            {
                                title = `${ITEMS[item]["name"]}`;
                            }
                            popup.find("div:first-child span").text(title); // set title

                            if (feature.properties["descriptions"] !== undefined) // set description
                            {
                                popup.find("div:nth-child(2) span").text(`${feature.properties["descriptions"][locale]}`);
                                popup.find("div:nth-child(2) span").css("display", "inline-block");
                            }
                            else
                            {
                                popup.find("div:nth-child(2) span").css("display", "none");
                            }

                            // set image
                            popup.find("div:nth-child(2) img").attr("src", feature.properties["image_url"]); // setting blank is ok
                            if (feature.properties["image_url"] === undefined) // but hide element then
                            {
                                popup.find("div:nth-child(2) img").css("display", "none");
                            }
                            else
                            {
                                popup.find("div:nth-child(2) img").css("display", "inline");
                            }

                            lastClickedMarker = newMarker;
                            if (feature.properties["number"] !== undefined)
                            {
                                lastNumber = feature.properties["number"];
                            }
                        });

                        return newMarker;
                    },
                    style: () => ITEMS[item]["options"],
                    onEachFeature: (feature, layer) =>
                    {
                        if (feature.properties["number"] !== undefined)
                        {
                            let divIconNumber = L.divIcon({
                                className: 'number-div-icon',
                                html: feature.properties["number"],
                                iconSize: [32, 32],
                                iconAnchor: [20, 7]
                            });

                            L.marker([feature.geometry.coordinates[1], feature.geometry.coordinates[0]], {
                                icon: divIconNumber,
                                interactive: false
                            }).addTo(newItemOverlay);

                            // load opacities from cookie
                            let completedCookie = getCookie("completed");

                            let completedArray = [];
                            if (completedCookie !== "") completedArray = JSON.parse(completedCookie);

                            if ((completedArray.indexOf(feature.properties["id"])) > -1)
                            {
                                $(`div .number-div-icon:contains(${feature.properties["number"]})`).addClass("completed");
                            }
                        }
                    }
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
    layersBoxEl.style.right = "65px";
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
    // let errorBox = $("#error-box");

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
            showInfo(errorBox, "Error: Please select item type");
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

                showInfo(errorBox, errorMsg);
            })
            .always(function ()
            { // finally
                crosshair.css("display", "none"); // hide crosshair
                newPointDiv.css("right", "-285px"); // hide form div
            });
    });

    /* FUNCTIONS */
    // function showInfo(element, msg)
    // {
    //     if (element.css("display") === "none")
    //     {
    //         element.html(msg).fadeIn(1000);
    //         setTimeout(() =>
    //         {
    //             element.fadeOut(4000);
    //         }, 6000); // show opacity 1.0 for 5s (+1s from fadeIn)
    //     }
    // }
}

function translate(locale)
{
    const dictionary = {
        "task-done": {
            "en": "Done",
            "pl": "Gotowe"
        },
        "bg-common": {
            "en": "Common",
            "pl": "Pospolite"
        },
        "bg-uncommon": {
            "en": "Uncommon",
            "pl": "Niepospolite"
        },
        "feedback": {
            "en": "Feedback",
            "pl": "Opinia"
        },
        "opt-email": {
            "en": "Email (optional)",
            "pl": "Email (niewymagany)"
        },
    }; // todo extend dictionary

    let elementsToTranslete = $("[data-translate]");
    for (let el of elementsToTranslete)
    {
        let tName = $(el).attr("data-translate");
        if ($(el).text() !== "") $(el).text(dictionary[tName][locale]); // translate

        for (let dataAttr in ($(el).data())) // find all data-translate-*
        {
            let attr = dataAttr.replace("translate", "").toLowerCase();
            if (attr !== "")
            {
                if ($(el).attr(attr) !== "") $(el).attr(attr, dictionary[tName][locale]);
            }
        }
    }
}

document.addEventListener("DOMContentLoaded", () =>
{
    errorBox = $("#error-box"); // init error box
    locale = getCookie("locale") || navigator.language || "en";

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
    battleRoyaleMap.on("contextmenu", (e) => e.preventDefault);
    // addContextMenu(ELEMENT_ID, battleRoyaleMap);

    /*to function...v*/
    let infoBox = $("div#popup");
    let closeBtn = infoBox.find(".close-btn");
    closeBtn.on("click", (e) =>
    {
        $(e.target).parent().parent().css("display", "none"); // hide div on close button click / $(this) doesn't work
        $(lastClickedMarker.getElement()).removeClass("active"); // remove active class from last clicked marker
    });
    let completionCheckbox = infoBox.find("form input[type=checkbox]");
    completionCheckbox.on("change", function ()
    {
        if (this.checked)
        {
            // lower marker opacity
            $(`div .number-div-icon:contains(${lastNumber})`).addClass("completed");
            lastClickedMarker.setOpacity(0.6);

            // add/update cookie
            let completedCookie = getCookie("completed");

            let completedArray = [];
            if (completedCookie !== "") completedArray = JSON.parse(completedCookie);

            for (let i of completedArray) // check id exist already in cookie
            {
                if (i === lastClickedMarker["options"]["id"])
                {
                    return; // nothing to do if exist
                }
            }
            completedArray.push(lastClickedMarker["options"]["id"]);
            setCookie("completed", JSON.stringify(completedArray), 180)
        }
        else
        {
            // set normal marker opacity
            $(`div .number-div-icon:contains(${lastNumber})`).removeClass("completed");
            lastClickedMarker.setOpacity(1.0);

            // remove id from cookie
            let completedCookie = getCookie("completed");

            let completedArray = [];
            if (completedCookie !== "") completedArray = JSON.parse(completedCookie);

            // remove all elements with given id
            let index;
            while ((index = completedArray.indexOf(lastClickedMarker["options"]["id"])) > -1)
            {
                completedArray.splice(index, 1);
            }
            setCookie("completed", JSON.stringify(completedArray), 180)
        }
        recalculateProgress();
    });

    $("#feedback form").on("submit", (e) =>
    {
        e.preventDefault();

        let feedback = $(e.target).find("*[name=feedback]");
        let email = $(e.target).find("*[name=email]");

        let formData = {
            feedback: feedback.val(),
            email: email.val()
        };

        $.ajax({
            url: API_URL + "feedback",
            type: "POST",
            data: JSON.stringify(formData),
            dataType: "text", // must be text if POST doesn't return json
            contentType: "application/json"
        })
            .done(function (geoJson)
            { // success
                $(e.target)[0].reset(); // reset form
                showInfo(errorBox, "Thank you for your feedback!")
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
                    errorMsg = `Feedback was not sent!<br>Error occurred: ${errorJSON["status"]} ${errorJSON["error"]}<br>${errorThrown}`;
                }

                showInfo(errorBox, errorMsg);
            })
            .always(function ()
            { // finally hit ESC key to close lightbox
                let ev = new KeyboardEvent('keydown', {
                    altKey: false,
                    bubbles: true,
                    cancelBubble: false,
                    cancelable: true,
                    charCode: 0,
                    code: "Esc",
                    composed: true,
                    ctrlKey: false,
                    currentTarget: null,
                    defaultPrevented: true,
                    detail: 0,
                    eventPhase: 0,
                    isComposing: false,
                    isTrusted: true,
                    key: "Esc",
                    keyCode: 27,
                    location: 0,
                    metaKey: false,
                    repeat: false,
                    returnValue: false,
                    shiftKey: false,
                    type: "keydown",
                    which: 27
                });

                document.dispatchEvent(ev);
            });
    });

    // focus form on show
    $("div.leaflet-control-attribution a[data-lity]").on("click", () =>
    {
        setTimeout(() => $("[name=feedback]").focus(), 0);
    });

    $("#cookies button").on("click", (e) =>
    {
        $(e.target).parent().parent().css("display", "none");
        setCookie("c-policy", "accepted", 180);
    });
    if (getCookie("c-policy") === "accepted") $("#cookies").css("display", "none");

    $("#locale img").on("click", (e) =>
    {
        setCookie("locale", $(e.target).attr("alt"), 180);
        location.reload();
    });

    translate(locale); // show page in selected language
});
