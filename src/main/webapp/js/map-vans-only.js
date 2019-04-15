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
    const LAYERS_URLS = ["reboot-vans"];
    const LAYERS_FRIENDLY_NAMES = ["Furgonetki"];
    const ICONS =
        {
            rebootVan: L.icon({
                iconUrl: '../images/icons/reboot-van.png',
                iconSize: [32, 32],
                iconAnchor: [16, 24],
                popupAnchor: [0, -16]
            })
        };
    const MAP_SHIFT = 70; // adjust this value to determine map center
    const MAP_WIDTH = 2500 + MAP_SHIFT;
    const MAP_HEIGHT = 2500 + MAP_SHIFT;
    const MAP_BOUNDS = [[(MAP_HEIGHT / -2) + MAP_SHIFT, (MAP_WIDTH / -2)], [(MAP_HEIGHT / 2) + MAP_SHIFT, (MAP_WIDTH / 2)]];

    let brMapEl = window.getComputedStyle(document.getElementById("fnbr_map"));
    let divHeight = brMapEl.height.replace("px", "").replace("%", "");
   // document.getElementById("fnbr_map").style.width = divHeight + "px";
   
    $("#fnbr_map").on("contextmenu", (e) => e.preventDefault()); // disable right-click context menu

    let battleRoyaleMap = L.map('fnbr_map', {
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
        dragging: !L.Browser.mobile,
        zoomTouch: true
    });

    L.control.attribution({prefix: "&copy; <a>Hory314</a>", position: "bottomright"}).addTo(battleRoyaleMap);


    // image file
    L.imageOverlay(`../images/maps/${MAP_VERSION}/full.jpg`, MAP_BOUNDS).addTo(battleRoyaleMap);

    let overlays = {};
    /* GRID */
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

    gridOverlay.addTo(battleRoyaleMap); // show grid by default
    /* /GRID */


    let newItemOverlay = L.layerGroup();
    ajax('../api/' + LAYERS_URLS[0], 'GET', function (geoJson)
    // ajax('http://localhost:8080/api/' + LAYERS_URLS[0], 'GET', function (geoJson)
    {
        L.geoJSON(geoJson, {
            pointToLayer: (geoJsonPoint, latlng) => L.marker(latlng, {icon: ICONS['rebootVan']}),
        }).addTo(newItemOverlay);
    });

    newItemOverlay.addTo(battleRoyaleMap); // check vans layer by default
    overlays[LAYERS_FRIENDLY_NAMES[0]] = newItemOverlay;
    overlays['Siatka mapy'] = gridOverlay; // add grid to overlays

    let layersBox = L.control.layers({}, overlays, {collapsed: true}).addTo(battleRoyaleMap);
    let layersBoxEl = layersBox.getContainer();
    layersBoxEl.style.top = "23px";
    layersBoxEl.style.right = "0px";

    // my custom zoom control (button)
    let zoomControl = L.control.zoom({position: 'topleft'}).addTo(battleRoyaleMap);
    let zoomControlEl = zoomControl.getContainer();
    zoomControlEl.style.top = "23px";
    zoomControlEl.style.left = "12px";

});
