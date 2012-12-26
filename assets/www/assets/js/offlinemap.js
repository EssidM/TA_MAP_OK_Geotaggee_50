function setOfflineMap(map){
    
//var pointsaffiches = new Array();
var radius ;
var cityTilesLayer = L.tileLayer('cache/{z}/{x}/{y}.png', {
    maxZoom : 19,
    minZoom : 16
});

var markerLoc = new L.marker();
var circle = new L.circle();
//var itineraire = new L.polyline([ [ 36.82675, 10.212 ], [ 36.82675, 10.2 ] ], {
//    color : 'blue',
//    weight : 5,
//    opacity : 0.5
//});
var layer;
var locLayer ;

// Dessiner le chemin entre les POI
function drawPath() {
    var tab = [];
    for (i = 0; i < points.length; i++) {
        tab.push(new L.LatLng(points[i].lat, points[i].lon));
    }
    poly = L.polyline(tab, {
        color : 'red',
        weight : 5,
        opacity : 0.5
    });
    poly.addTo(map);
}

//variable globale fil offlinemap.js
var curZoom = map.getZoom(); 

//function
function doubleZoom()
{
      var z = map.getZoom(); 
      if( z==12 || z==13 || z==14 || z==15 || z == 17 || z==19 ) return;
      
      var dir = z - curZoom;
      //alert(dir);
      if( dir > 0 ){ curZoom = z+1; } else {
          curZoom = z-1;
      }

      setTimeout(function()
        { map.setZoom(curZoom);}, 0 );
}


//fired when 
map.on('viewreset', doubleZoom);
map.on('load', setInitialZoom);


function drawPOIs() {
    var tabPOI = [];
 //   var tabSpecPOI = [];

    for (i = 0; i < points.length; i = i + 1) {
        var poi = new L.LatLng(points[i].lat, points[i].lon);

        markerPOI = new L.Marker(poi);
        markerPOI.bindPopup("<h3>" + points[i].text + "</h3>");
        tabPOI.push(markerPOI);
    }
    ;


    layerPOI = new L.LayerGroup(tabPOI);
    layerPOI.addTo(map);


}

//var onMarkerClick = function(e) {
//    var latlng = e.layer.getLatLng();
//    // text = e.layer.options.title;
//
//    L.popup({
//        offset : new L.Point(1, -35)
//    }).setLatLng(latlng).setContent("text").openOn(map);
//
//    map.panTo(latlng);
//};

// dessiner la carte
cityTilesLayer.addTo(map);
// dessiner les Points d'interets
drawPOIs();
// dessiner le chemin entre les points d'interet
drawPath();

//function aProximite(e) {
//    for (i = 0; i < points.length; i++) {
//        var aProx = new L.LatLng(points[i].lat, points[i].lon);
//        if ((e.bounds).contains(aProx) && !(contains(pointsaffiches,aProx))) {
//            $(this).toastmessage('showNoticeToast', points[i].text + " à " + radius + " mètres");
//            pointsaffiches.push(aProx);
//        }
//    }
//}



function onLocationFound(e) {

    radius = e.accuracy / 2;
    
 // marker de géolocalisation
    markerLoc.setLatLng(e.latlng);

    // mise à jour du L.cirle délimitant la précision de la géolocalisation
    circle.setLatLng(e.latlng);
    circle.setRadius(radius);

    // mise à jour du dessin de l'itineraire
    //itineraire.spliceLatLngs(0, 2, e.latlng, poly.getLatLngs()[0]);

    

    locLayer = new L.LayerGroup([ markerLoc, circle ]);
    locLayer.addTo(map);
    markerLoc.bindPopup("You are within " + radius + " meters from this point")
            .openPopup();
    
    
    
//    for(var p in pointsaffiches){
//        if(!((e.bounds).contains(p))){
//            pointsaffiches.remove(p);
//            $(this).toastmessage('showNoticeToast', 'removed' + p.text);
//
//        }
        
//    }
    
    
//    aProximite(e);
//    $(this).toastmessage('showNoticeToast', pointsaffiches.length);
}

function onLocationError(e) {
    alert(e.message);
}

function contains(a, obj) {
    for (var i = 0; i < a.length; i++) {
        if (a[i] == obj) {
            return true;
        }
    }
    return false;
}

map.on('locationfound', onLocationFound);
map.on('locationerror', onLocationError);

map.locate({
    watch : true,
    setView : true,
    timeout : 20000,
    enableHighAccuracy : true
});

function setInitialZoom(){
    
    var initZoom = 19;
    //alert(dir);

    setTimeout(function()
      { map.setZoom(initZoom);}, 0 );
    
}


}

