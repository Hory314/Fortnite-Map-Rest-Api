function loadJSON(url, callback)
{
    let xobj = new XMLHttpRequest();
    xobj.overrideMimeType("application/json");
    xobj.open('GET', url, true);
    xobj.onreadystatechange = function ()
    {
        if (xobj.readyState === 4 && xobj.status == "200")
        {
            // Required use of an anonymous callback as .open will NOT return a value but simply returns undefined in asynchronous mode
            callback(xobj.responseText);
        }
    };
    xobj.send(null);
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

document.addEventListener("DOMContentLoaded", () =>
{
    const MAP_VERSION = "8.20";
    const LAYERS_URLS = ["chests", "vending-machines", "reboot-vans"];
    const LAYERS_FRIENDLY_NAMES = ["Skrzynie", "Automaty", "Vany"];

    const ICONS =
        {
            chest: L.icon({
                iconUrl: 'images/icons/chest.png',
                iconSize: [32, 32],
                iconAnchor: [16, 16],
                popupAnchor: [0, -16]
            }),
            vendingMachine: L.icon({
                iconUrl: 'images/icons/vending-machine.png',
                iconSize: [25, 32],
                iconAnchor: [12.5, 16],
                popupAnchor: [0, -16]
            })
        };

    const MAP_SHIFT = 70; // adjust this value to determine map center
    const MAP_WIDTH = 2500 + MAP_SHIFT;
    const MAP_HEIGHT = 2500 + MAP_SHIFT;
    // const MAP_BOUNDS = [[0, 0], [MAP_HEIGHT, MAP_WIDTH]];
    const MAP_BOUNDS = [[(MAP_HEIGHT / -2) + MAP_SHIFT, (MAP_WIDTH / -2)], [(MAP_HEIGHT / 2) + MAP_SHIFT, (MAP_WIDTH / 2)]];

    let brMapEl = window.getComputedStyle(document.getElementById("fnbr_map"));
    let divHeight = brMapEl.height.replace("px", "").replace("%", "");
   // document.getElementById("fnbr_map").style.width = divHeight + "px";

       $("#fnbr_map").on("contextmenu", (e) => e.preventDefault()); // disable right-click context menu

    console.log("hei: " + divHeight);
    console.log(Math.log2(MAP_HEIGHT / divHeight));

    let battleRoyaleMap = L.map('fnbr_map', {
        crs: L.CRS.Simple,
        minZoom: Math.log2(MAP_HEIGHT / divHeight) * (-1),
        maxZoom: Math.log2(MAP_HEIGHT / divHeight) * (-1) + 4,
        center: [MAP_WIDTH / 2, MAP_HEIGHT / 2],
        zoom: Math.log2(MAP_HEIGHT / divHeight) * (-1),
        maxBounds: MAP_BOUNDS,
        zoomDelta: 0.25,
        zoomSnap: 0,
        wheelPxPerZoomLevel: 50,
        wheelDebounceTime: 20
    });

    L.imageOverlay(`images/maps/${MAP_VERSION}/full.jpg`, MAP_BOUNDS).addTo(battleRoyaleMap);

    /* GRID */
    // let center = L.latLng(0, 0);
    // L.marker(center).addTo(battleRoyaleMap).bindPopup("Map center");
    let gridOptions =
        {
            color: 'white',
            weight: 1,
            opacity: 0.3,
            lineCap: 'butt',
            lineJoin: 'bevel',

        };

    for (let i = -1250; i <= 1250; i += 250)
    {
        L.polyline([L.latLng(-1250, i), L.latLng(1250, i)], gridOptions).addTo(battleRoyaleMap);
        L.polyline([L.latLng(i, -1250), L.latLng(i, 1250)], gridOptions).addTo(battleRoyaleMap);

        for (let j = -1250; j <= 1250; j += 250)
        {
            // let pnt = L.latLng(j, i);
            // L.marker(pnt).addTo(battleRoyaleMap).bindPopup(j + " " + i);
        }


    }
    /* /GRID */

    // let chestsOverlay = L.layerGroup();
    // let vendingMachinesOverlay = L.layerGroup();
    // for (var property in ICONS)
    // {
    //     console.log(`ICONS.${property} = ${ICONS[property]}`);
    // }
    // read chests json
    ///////////////////////////////////////////////////////////////////////////////////////////////////////////
    // for (let i = 0; i < LAYERS_URLS.length; i++)


    let overlays = {};

    let i = 0;
    for (let iconName in ICONS)
    {
        let newItemOverlay = L.layerGroup();
        ajax('http://localhost:8080/api/' + LAYERS_URLS[i], 'GET', function (geoJson)
        {
            L.geoJSON(geoJson, {
                pointToLayer: (geoJsonPoint, latlng) => L.marker(latlng, {icon: ICONS[iconName]}),
            }).bindPopup(layer =>
            {
                return "y: " + layer.feature.geometry.coordinates[1].toString() + "<br>x: " + layer.feature.geometry.coordinates[0].toString()
            }).addTo(newItemOverlay);
        });

        if (LAYERS_URLS[i] === 'chests') newItemOverlay.addTo(battleRoyaleMap); // check chest layer by default
        overlays[LAYERS_FRIENDLY_NAMES[i]] = newItemOverlay;

        i++;
    }
    L.control.layers({}, overlays, {collapsed: true}).addTo(battleRoyaleMap);

    // DEBUG
    for (let propName in overlays)
    {
        if (overlays.hasOwnProperty(propName))
        {
            console.log(`propName : ${overlays[propName]}`);
        }
    }


    // function getItem(geoJson)
    // {
    //     L.geoJSON(geoJson, {
    //         pointToLayer: (geoJsonPoint, latlng) => L.marker(latlng, {icon: ICONS['chest']}),
    //     }).bindPopup(layer =>
    //     {
    //         return "y: " + layer.feature.geometry.coordinates[1].toString() + "<br>x: " + layer.feature.geometry.coordinates[0].toString()
    //     }).addTo(chestsOverlay);
    // }

    ///////////////////////////////////////////////////////////////////////////////////////////////////////////
    ///////////////////////////////////////////////////////////////////////////////////////////////////////////
    // ajax('http://localhost:8080/api/chests', 'GET', getItem);
    ///////////////////////////////////////////////////////////////////////////////////////////////////////////
    ///////////////////////////////////////////////////////////////////////////////////////////////////////////
    ///////////////////////////////////////////////////////////////////////////////////////////////////////////

    // loadJSON("chests.geojson", function (response)
    // {
    //     // Parse JSON string into object
    //     let jsonObj = JSON.parse(response);
    //
    //     L.geoJSON(jsonObj, {
    //         pointToLayer: (geoJsonPoint, latlng) => L.marker(latlng, {icon: ICONS['chest']}),
    //     }).bindPopup(layer =>
    //     {
    //         return "y: " + layer.feature.geometry.coordinates[1].toString() + "<br>x: " + layer.feature.geometry.coordinates[0].toString()
    //     }).addTo(chestsOverlay);
    // });

    // read vending machnes json
    // loadJSON("vending-machines.geojson", function (response)
    // {
    //     // Parse JSON string into object
    //     let jsonObj = JSON.parse(response);
    //
    //     L.geoJSON(jsonObj, {
    //         pointToLayer: (geoJsonPoint, latlng) => L.marker(latlng, {icon: ICONS['vendingMachine']}),
    //     }).bindPopup(layer =>
    //     {
    //         return "y: " + layer.feature.geometry.coordinates[1].toString() + "<br>x: " + layer.feature.geometry.coordinates[0].toString()
    //     }).addTo(vendingMachinesOverlay);
    // });

    // let overlays = {
    //     "Chests": chestsOverlay,
    //     "Vending Machines": vendingMachinesOverlay
    // };
    //
    // battleRoyaleMap.addLayer(chestsOverlay);
    // L.control.layers({}, overlays, {collapsed: false}).addTo(battleRoyaleMap);

    /* POPUP */
    let popup = L.popup();

    function onMapClick(e)
    {
        popup
            .setLatLng(e.latlng)
            .setContent("You clicked the map at " + e.latlng.toString())
            .openOn(battleRoyaleMap);
    }

    battleRoyaleMap.on('click', onMapClick);
});