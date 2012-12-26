var onDeviceReady = function() {
};

//var points = [
//
//{
//    id : 192,
//    text : "Dev Center",
//    lat : 36.83466,
//    lon : 10.243332,
//}, {
//    id : 193,
//    text : "technocasa",
//    lon : 10.241366,
//    lat : 36.834606,
//}, {
//    id : 194,
//    text : "EZZEMNI FastFood",
//    lon : 10.241504,
//    lat : 36.83519,
//}, {
//    id : 195,
//    text : "Assurance Maghrebia",
//    lon : 10.241437,
//    lat : 36.8347175,
//}, {
//    id : 196,
//    text : "Roma Caf�",
//    lon : 10.241471,
//    lat : 36.834187,
//}, {
//    id : 197,
//    text : "The Squat",
//    lon : 10.241825,
//    lat : 36.834198,
//}, {
//    id : 198,
//    text : " Six/Seven",
//    lon : 10.242097,
//    lat : 36.83445,
//}, {
//    id : 200,
//    text : "Divona",
//    lon : 10.243074,
//    lat : 36.834702,
//}, {
//    id : 201,
//    text : "Milton",
//    lon : 10.243384,
//    lat : 36.834873,
//}
//
//];

var points = [
{
    id : 200,
    text : "Divona",
    lon : 10.243071,
    lat : 36.834668,
}, {
    id : 201,
    text : "Milton",
    lon : 10.243291,
    lat : 36.834724,
},
{
    id : 192,
    text : "Dev Center",
    lat : 36.834591,
    lon : 10.242701,
}, {
    id : 193,
    text : "technocasa",
    lon : 10.242535,
    lat : 36.834612,
}, {
    id : 194,
    text : "café sandwich milieu",
    lon : 10.241504,
    lat : 36.83519,
    text : "EZZEMNI FastFood",
    lon : 10.242256,
    lat : 36.835084,
}, {
    id : 195,
    text : "Beyrouth Cafe",
    lon : 10.242068,
    lat : 36.835539,
}, {
    id : 196,
    text : "Angle Roma Café",
    lon : 10.241471,
    lat : 36.834187,
    text : "Dum Pukht Resto",
    lon : 10.241891,
    lat : 36.83587,
}, {
    id : 197,
    text : "Fiat",
    lon : 10.242733,
    lat : 36.836093,
}, {
    id : 198,
    text : " Lake club",
    lon : 10.244181,
    lat : 36.836505,
}

];

function initMap() {
    document.addEventListener("deviceready", onDeviceReady, true);

    var options = getMapOptions();
    var map = L.map('map', options);
    //var PB = new Array();
    
    setOnlineMap(map);
    setOfflineMap(map);
    

}

function getMapOptions() {
    var southWest = new L.LatLng(36.83017, 10.23365), northEast = new L.LatLng(
            36.83922, 10.25017), cityBounds = new L.LatLngBounds(southWest,
            northEast);

    // d�sactiver webkit 3d CSS transformations for tile positioning,
    // ca cr�e beaucoup de flicker dans PhoneGap pour des raisons que j'ignore
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
