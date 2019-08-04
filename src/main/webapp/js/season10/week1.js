const embedCode = `<iframe id="fortbytes-map" title="Fortbytes Map"\r\n\tscrolling="no" frameborder="0" border="0" cellspacing="0"\r\n\tstyle="height: 100vh; width: 100vw; overflow: hidden; margin: 0 auto; display: block;"\r\n\tsrc="${window.location.href}">\r\n</iframe>`;

// user console hello + embed code
console.log(`%cHello Developer!\nUse the code below to embed this map on your site:\n` + `%c${embedCode}` + `%c\n\nAPI documentation will be available soon.`, "color: rgb(58, 131, 105); font-family: 'Arial', serif; font-size: 18px;", "color: gray; font-family: monospace; font-size: 14px;", "color: rgb(58, 131, 105); font-family: 'Arial', serif; font-size: 18px;");

const ELEMENT_ID = "fnbr_map";
const MAP_VERSION = "10.00";
const TILE_MAP_URL_TEMPLATE = "{z}/{x}/{y}.jpg";
// const API_URL = "http://localhost:8080/api/";
const API_URL = "/api/";
const MAP_WIDTH = 2500;
const MAP_HEIGHT = 2500;
const MAP_SCALE_FIX = 120;
const MAP_BOUNDS = [[-MAP_HEIGHT / 2 - MAP_SCALE_FIX / 2, -MAP_WIDTH / 2 - MAP_SCALE_FIX / 2], [MAP_HEIGHT / 2 + MAP_SCALE_FIX / 2, MAP_WIDTH / 2 + MAP_SCALE_FIX / 2]];
const MAX_ZOOM = 5;
const MIN_ZOOM = 2;
const languages = ["en", "pl"];
let errorBox; // init after DOM content loaded
let locale;

const LOCAL_DICTIONARY =
    {
        challenge1: {
            "en": "Visit Drift painted Durrr Burger Head, a Dinosaur, and a Stone Head Statue",
            "pl": "Visit Drift painted Durrr Burger Head, a Dinosaur, and a Stone Head Statue"
        },
        challenge2: {
            "en": "Deal 200 damage to opponents while riding in a vehicle",
            "pl": "Deal 200 damage to opponents while riding in a vehicle"
        },
        challenge3: {
            "en": "Destroy 10 stop signs with the Catalyst outfit",
            "pl": "Destroy 10 stop signs with the Catalyst outfit"
        },
        challenge4: {
            "en": "Ride a Zipline in 3 different matches",
            "pl": "Ride a Zipline in 3 different matches"
        },
        challenge5: {
            "en": "Search chests in 3 different named locations",
            "pl": "Search chests in 3 different named locations"
        },
        challenge6: {
            "en": "Visit Lazy Lagoon and Lucky Landing in a single match",
            "pl": "Visit Lazy Lagoon and Lucky Landing in a single match"
        },
        challenge7: {
            "en": "Get 250,000 trick points in a vehicle",
            "pl": "Get 250,000 trick points in a vehicle"
        },
        prestigeChallenge1: {
            "en": "Visit Drift painted Durrr Burger Head, a Dinosaur, and a Stone Head Statue in a single match",
            "pl": "Visit Drift painted Durrr Burger Head, a Dinosaur, and a Stone Head Statue in a single match"
        },
        prestigeChallenge2: {
            "en": "5 eliminations while riding a vehicle",
            "pl": "5 eliminations while riding a vehicle"
        },
        prestigeChallenge3: {
            "en": "Destroy 7 stop signs with the Catalyst outfit in a single match",
            "pl": "Destroy 7 stop signs with the Catalyst outfit in a single match"
        },
        prestigeChallenge4: {
            "en": "Deal 200 damage to opponents while riding a Zipline",
            "pl": "Deal 200 damage to opponents while riding a Zipline"
        },
        prestigeChallenge5: {
            "en": "Eliminate opponents in 5 different named locations",
            "pl": "Eliminate opponents in 5 different named locations"
        },
        prestigeChallenge6: {
            "en": "Visit 10 different named locations in a single match",
            "pl": "Visit 10 different named locations in a single match"
        },
        prestigeChallenge7: {
            "en": "Get 500,000 trick points in a vehicle in a single match",
            "pl": "Get 500,000 trick points in a vehicle in a single match"
        },
    };

const ITEMS = //
    {
        zipline: {
            url: "ziplines",
            name: "Ziplines",
            icon: L.icon({
                iconUrl: '../../images/icons/zipline.png',
                iconSize: [32, 32],
                iconAnchor: [4, 1],
                popupAnchor: [0, -16],
                className: 'zipline-icon'
            }),
            options: { // line options
                color: "#000000",
                width: 3,
                dashArray: "3 3",
                interactive: false
            }
        },
        chest: {
            url: "chests",
            name: "Chests",
            icon: L.icon({
                iconUrl: '../../images/icons/chest.png',
                iconSize: [32, 32],
                iconAnchor: [16, 16],
                popupAnchor: [0, -16],
                className: 'chest-icon'
            })
        },
        stoneHeadStatue: {
            icon: L.icon({
                iconUrl: '../../images/icons/stone-head-statue.png',
                iconSize: [48, 64],
                iconAnchor: [24, 32],
                popupAnchor: [0, -16],
                className: 'stone-head-statue-icon'
            }),
            options: { // line options
                color: "#000000",
                width: 3,
                dashArray: "3 3",
                interactive: false
            }
        },
        burgerHead: {
            icon: L.icon({
                iconUrl: '../../images/icons/durrr-burger-head.png',
                iconSize: [48, 48],
                iconAnchor: [24, 24],
                popupAnchor: [0, -16],
                className: 'burger-head-icon'
            }),
            options: { // line options
                color: "#000000",
                width: 3,
                dashArray: "3 3",
                interactive: false
            }
        },
        dino: {
            icon: L.icon({
                iconUrl: '../../images/icons/dino.png',
                iconSize: [64, 48],
                iconAnchor: [32, 24],
                popupAnchor: [0, -16],
                className: 'dino-icon'
            }),
            options: { // line options
                color: "#000000",
                width: 3,
                dashArray: "3 3",
                interactive: false
            }
        },
        driftBoard: {
            url: "drift-boards",
            name: "Drift Boards",
            icon: L.icon({
                iconUrl: '../../images/icons/drift-board.png',
                iconSize: [48, 32],
                iconAnchor: [24, 16],
                popupAnchor: [0, -16],
                className: 'drift-board-icon'
            }),
            options: { // line options
                color: "#000000",
                width: 3,
                dashArray: "3 3",
                interactive: false
            }
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
        prefix: `&copy; <a style='cursor: default;'>Hory314</a> | <a data-translate='full-map' href='${window.location.href}'>Full map version</a>`,
        position: "bottomright"
    }).addTo(battleRoyaleMap);
    L.control.attribution({
        prefix: "<a href='#feedback' data-lity data-translate='feedback'>Feedback</a>",
        position: "bottomright"
    }).addTo(battleRoyaleMap);

    // map tiles
    L.tileLayer(`../../images/maps/${MAP_VERSION}/` + TILE_MAP_URL_TEMPLATE, {
        maxZoom: MAX_ZOOM,
        minZoom: MIN_ZOOM,
        tms: false,
        noWrap: true,
        bounds: MAP_BOUNDS, // unnecessary tiles are not loaded if bounds are set
        keepBuffer: 32, // # of saved tiles (until zoom)
        updateInterval: 50, // 50 ms, default 200 ms
    }).addTo(battleRoyaleMap);

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


function addChallengesToOverlays(map)
{
    // NORMAL
    let overlays = {};

    addChallenge1(overlays, map); // Visit Drift painted Durrr Burger Head, a Dinosaur, and a Stone Head Statue

    addChallenge2(overlays, map); // Deal 200 damage to opponents while riding in a vehicle

    addChallenge3(overlays, map); // Destroy 10 stop signs with the Catalyst outfit

    addChallenge4(overlays, map); // Ride a Zipline in 3 different matches

    addChallenge5(overlays, map); // Search chests in 3 different named locations

    addChallenge6(overlays, map); // Visit Lazy Lagoon and Lucky Landing in a single match

    addChallenge7(overlays, map); // Get 250,000 trick points in a vehicle

    // PRESTIGE
    let overlays2 = {};
    addPrestigeChallenge1(overlays2, map); // Visit Drift painted Durrr Burger Head, a Dinosaur, and a Stone Head Statue in a single match

    addPrestigeChallenge2(overlays2, map); // 5 eliminations while riding a vehicle

    addPrestigeChallenge3(overlays2, map); // Destroy 7 stop signs with the Catalyst outfit in a single match

    addPrestigeChallenge4(overlays2, map); // Deal 200 damage to opponents while riding a Zipline

    addPrestigeChallenge5(overlays2, map); // Eliminate opponents in 5 different named locations

    addPrestigeChallenge6(overlays2, map); // Visit 10 different named locations in a single match

    addPrestigeChallenge7(overlays2, map); // Get 500,000 trick points in a vehicle in a single match

    return [overlays, overlays2];
}

function customizeLayersBoxMissionNormal(map, overlays)
{
    let layersBox = L.control.layers({}, overlays, {collapsed: true}).addTo(map);
    let layersBoxEl = layersBox.getContainer();
    $(layersBoxEl).find("a.leaflet-control-layers-toggle").addClass("layer-icon-mission-normal");
    layersBoxEl.style.top = "23px";
    layersBoxEl.style.right = "65px";
}


function customizeLayersBoxMissionPrestige(map, overlays)
{
    let layersBox = L.control.layers({}, overlays, {collapsed: true}).addTo(map);
    let layersBoxEl = layersBox.getContainer();
    $(layersBoxEl).find("a.leaflet-control-layers-toggle").addClass("layer-icon-mission-prestige");
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

function translate(locale)
{
    let elementsToTranslete = $("[data-translate]");
    for (let el of elementsToTranslete)
    {
        let tName = $(el).attr("data-translate");

        for (let dataAttr in ($(el).data())) // find all data-translate-*
        {
            if (dataAttr === "translateNoInnerhtml") continue;
            let attr = dataAttr.replace("translate", "").toLowerCase();
            if (attr !== "")
            {
                if ($(el).attr(attr) !== "") $(el).attr(attr, DICTIONARY[tName][locale]);
            }
        }

        if (!$(el).get(0).hasAttribute("data-translate-no-innerhtml"))
        {
            if ($(el).text() !== "") // translate
            {
                $(el).text(DICTIONARY[tName][locale]);
            }
        }
    }
}

document.addEventListener("DOMContentLoaded", () =>
{
    /* init language */
    locale = getCookie("locale") || (navigator.language).substring(0, 2) || "en";
    if (languages.indexOf(locale) === -1) locale = "en"; // check if we support the language

    /* init error box */
    errorBox = $("#error-box");

    /* init map */
    let battleRoyaleMap = initMap(ELEMENT_ID);

    /* init grid */
    let gridOverlay = initGridOverlay(battleRoyaleMap);

    /* load JSONs*/
    //let overlays = addJsonToOverlays(battleRoyaleMap);
    let overlays = addChallengesToOverlays(battleRoyaleMap);
    overlays[0][DICTIONARY["map-grid"][locale]] = gridOverlay; // add grid to overlays (as last entry)

    /* customize layers box */
    customizeLayersBoxMissionNormal(battleRoyaleMap, overlays[0]);
    customizeLayersBoxMissionPrestige(battleRoyaleMap, overlays[1]);

    /* customize zoom button */
    customizeZoomButton(battleRoyaleMap);

    /* prevent context menu */
    battleRoyaleMap.on("contextmenu", (e) => e.preventDefault);

    /* on feedback form submit */
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
                showInfo(errorBox, DICTIONARY["feedback-ok"][locale])
            })
            .fail(function (xhr, textStatus, errorThrown)
            { // fail
                let errorJSON = JSON.parse(xhr.responseText);
                let errorMsg;
                if (errorJSON["status"] === undefined)
                {
                    errorMsg = `${DICTIONARY["feedback-not-sent"][locale]}<br>${errorThrown}`;
                }
                else
                {
                    errorMsg = `${DICTIONARY["feedback-not-sent"][locale]}<br>${DICTIONARY["err-occured"][locale]}: ${errorJSON["status"]} ${errorJSON["error"]}<br>${errorThrown}`;
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

    /* populate embed code */
    $("form.code textarea").text(embedCode);
});

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

/////////////////// NORMAL
function addChallenge1(overlays, map)
{
    let layer = L.layerGroup();

    // points inits here
    // burger
    L.marker([579.841309, -341.572266], {
        icon: ITEMS.burgerHead.icon,
        riseOnHover: true,
        interactive: false,
        zIndexOffset: 500 // +500 to z-index for markers
    }).addTo(layer);

    // dino
    L.marker([-868.00293, 811.074219], {
        icon: ITEMS.dino.icon,
        riseOnHover: true,
        interactive: false,
        zIndexOffset: 500 // +500 to z-index for markers
    }).addTo(layer);

    // stone
    L.marker([742.95166, 28.144531], {
        icon: ITEMS.stoneHeadStatue.icon,
        riseOnHover: true,
        interactive: false,
        zIndexOffset: 500 // +500 to z-index for markers
    }).addTo(layer);

    layer.addTo(map); // show on map (checked)
    overlays[LOCAL_DICTIONARY["challenge1"][locale]] = layer; // show on panel
}

function addChallenge2(overlays, map)
{
    let layer = L.layerGroup();

    // points inits here
    $.ajax({
        url: API_URL + ITEMS["driftBoard"]['url'],
        type: 'GET'
    })
        .done(function (geoJson)
        {
            L.geoJSON(geoJson, {
                pointToLayer: (feature, latlng) =>
                {
                    let newMarker = L.marker(latlng, {
                        icon: ITEMS["driftBoard"]["icon"],
                        id: feature.properties["id"],
                        type: ITEMS.driftBoard,
                        riseOnHover: true,
                        interactive: false,
                        zIndexOffset: 500 // +500 to z-index for markers
                    });

                    if (feature.properties["number"] !== undefined) newMarker["options"]["number"] = feature.properties["number"];

                    return newMarker;
                },
                style: () => ITEMS["driftBoard"]["options"]
            }).addTo(layer);
        });

    layer.addTo(map); // show on map (checked)
    overlays[LOCAL_DICTIONARY["challenge2"][locale]] = layer; // show on panel
}

function addChallenge3(overlays, map)
{
    let layer = L.layerGroup();

    // points inits here


    layer.addTo(map); // show on map (checked)
    overlays[LOCAL_DICTIONARY["challenge3"][locale]] = layer; // show on panel
}

function addChallenge4(overlays, map)
{
    let layer = L.layerGroup();

    // points inits here
    $.ajax({
        url: API_URL + ITEMS["zipline"]['url'],
        type: 'GET'
    })
        .done(function (geoJson)
        {
            L.geoJSON(geoJson, {
                pointToLayer: (feature, latlng) =>
                {
                    // create new icon
                    let icon = L.divIcon({
                        iconUrl: ITEMS["zipline"]["icon"]["options"]["iconUrl"],
                        iconSize: ITEMS["zipline"]["icon"]["options"]["iconSize"],
                        iconAnchor: ITEMS["zipline"]["icon"]["options"]["iconAnchor"],
                        popupAnchor: ITEMS["zipline"]["icon"]["options"]["popupAnchor"],
                        html: `<img src="${ITEMS["zipline"]["icon"]["options"]["iconUrl"]}">` + `<span>${feature.properties["number"] !== undefined ? feature.properties["number"] : ""}</span>`, //fixme if check if number exist and html only for fortbyte
                        className: ITEMS["zipline"]["icon"]["options"]["className"]
                    });

                    let newMarker = L.marker(latlng, {
                        icon: icon,
                        id: feature.properties["id"],
                        type: ITEMS.zipline,
                        riseOnHover: true,
                        interactive: false,
                        zIndexOffset: 500 // +500 to z-index for markers
                    });

                    if (feature.properties["number"] !== undefined) newMarker["options"]["number"] = feature.properties["number"];

                    return newMarker;
                },
                style: () => ITEMS["zipline"]["options"]
            }).addTo(layer);
        });

    layer.addTo(map); // show on map (checked)
    overlays[LOCAL_DICTIONARY["challenge4"][locale]] = layer; // show on panel
}

function addChallenge5(overlays, map)
{
    let layer = L.layerGroup();

    // points inits here
    $.ajax({
        url: API_URL + ITEMS["chest"]['url'] + "/in-named-locations",
        type: 'GET'
    })
        .done(function (geoJson)
        {
            L.geoJSON(geoJson, {
                pointToLayer: (feature, latlng) =>
                {
                    // create new icon
                    let icon = L.divIcon({
                        iconUrl: ITEMS["chest"]["icon"]["options"]["iconUrl"],
                        iconSize: ITEMS["chest"]["icon"]["options"]["iconSize"],
                        iconAnchor: ITEMS["chest"]["icon"]["options"]["iconAnchor"],
                        popupAnchor: ITEMS["chest"]["icon"]["options"]["popupAnchor"],
                        html: `<img src="${ITEMS["chest"]["icon"]["options"]["iconUrl"]}">` + `<span>${feature.properties["number"] !== undefined ? feature.properties["number"] : ""}</span>`, //fixme if check if number exist and html only for fortbyte
                        className: ITEMS["chest"]["icon"]["options"]["className"]
                    });

                    let newMarker = L.marker(latlng, {
                        icon: icon,
                        id: feature.properties["id"],
                        type: ITEMS.chest,
                        riseOnHover: true,
                        interactive: false,
                        zIndexOffset: 500 // +500 to z-index for markers
                    });

                    if (feature.properties["number"] !== undefined) newMarker["options"]["number"] = feature.properties["number"];

                    return newMarker;
                },
                style: () => ITEMS["chest"]["options"]
            }).addTo(layer);
        });

    layer.addTo(map); // show on map (checked)
    overlays[LOCAL_DICTIONARY["challenge5"][locale]] = layer; // show on panel
}

function addChallenge6(overlays, map)
{
    let layer = L.layerGroup();

    // points inits here

    layer.addTo(map); // show on map (checked)
    overlays[LOCAL_DICTIONARY["challenge6"][locale]] = layer; // show on panel
}

function addChallenge7(overlays, map)
{
    let layer = L.layerGroup();

    // points inits here

    layer.addTo(map); // show on map (checked)
    overlays[LOCAL_DICTIONARY["challenge7"][locale]] = layer; // show on panel
}

/////////////////// PRESTIGE
function addPrestigeChallenge1(overlays, map)
{
    let layer = L.layerGroup();

    // points inits here

    overlays[LOCAL_DICTIONARY["prestigeChallenge1"][locale]] = layer; // show on panel
}

function addPrestigeChallenge2(overlays, map)
{
    let layer = L.layerGroup();

    // points inits here

    overlays[LOCAL_DICTIONARY["prestigeChallenge2"][locale]] = layer; // show on panel
}

function addPrestigeChallenge3(overlays, map)
{
    let layer = L.layerGroup();

    // points inits here

    overlays[LOCAL_DICTIONARY["prestigeChallenge3"][locale]] = layer; // show on panel
}

function addPrestigeChallenge4(overlays, map)
{
    let layer = L.layerGroup();

    // points inits here

    overlays[LOCAL_DICTIONARY["prestigeChallenge4"][locale]] = layer; // show on panel
}

function addPrestigeChallenge5(overlays, map)
{
    let layer = L.layerGroup();

    // points inits here

    overlays[LOCAL_DICTIONARY["prestigeChallenge5"][locale]] = layer; // show on panel
}

function addPrestigeChallenge6(overlays, map)
{
    let layer = L.layerGroup();

    // points inits here

    overlays[LOCAL_DICTIONARY["prestigeChallenge6"][locale]] = layer; // show on panel
}

function addPrestigeChallenge7(overlays, map)
{
    let layer = L.layerGroup();

    // points inits here

    overlays[LOCAL_DICTIONARY["prestigeChallenge7"][locale]] = layer; // show on panel
}