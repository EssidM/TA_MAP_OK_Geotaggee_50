var onDeviceReady = function() {
};

var points = [

{
    id : 192,
    text : "Dev Center",
    lat : 36.83466,
    lon : 10.243332,
}, {
    id : 193,
    text : "technocasa",
    lon : 10.241366,
    lat : 36.834606,
}, {
    id : 194,
    text : "café sandwich milieu",
    lon : 10.241504,
    lat : 36.83519,
}, {
    id : 195,
    text : "Maghribia Parking",
    lon : 10.241437,
    lat : 36.8347175,
}, {
    id : 196,
    text : "Angle Roma Café",
    lon : 10.241471,
    lat : 36.834187,
}, {
    id : 197,
    text : "Poto the Squat",
    lon : 10.241825,
    lat : 36.834198,
}, {
    id : 198,
    text : "Poto 6/7",
    lon : 10.242097,
    lat : 36.83445,
}, {
    id : 199,
    text : "technocasa en face",
    lon : 10.242702,
    lat : 36.834808,
}, {
    id : 200,
    text : "Poto Divona",
    lon : 10.243074,
    lat : 36.834702,
}, {
    id : 202,
    text : "Poto after Milton",
    lon : 10.243664,
    lat : 36.8349,
}, {
    id : 201,
    text : "Poto Milton",
    lon : 10.243384,
    lat : 36.834873,
}

];

function init() {
    document.addEventListener("deviceready", onDeviceReady, true);

    var options = getMapOptions();
    var map = L.map('map', options);
    var PB = new Array();
    
    setOnlineMap(map);
    setOfflineMap(map);

}

function getMapOptions() {
    var southWest = new L.LatLng(36.83017, 10.23365), northEast = new L.LatLng(
            36.83922, 10.25017), cityBounds = new L.LatLngBounds(southWest,
            northEast);

    // désactiver webkit 3d CSS transformations for tile positioning,
    // ca crée beaucoup de flicker dans PhoneGap pour des raisons que j'ignore
    // encore...

    L.Browser.webkit3d = false;
    options = {
        //maxBounds : cityBounds
    };

    if (navigator.userAgent.match(/Android 2/)) {
        options.doubleClickZoom = true;
        options.touchZoom = false;

        // Android 2.x
        // @todo enable the pinch-zoom plugin
    } else {
        options.zoomControl = true;
        options.touchZoom = true;
    }

    return options;
}
