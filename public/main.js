console.log('yayayaa!');
//

// function that creates map and shoves it on the screen


var map, currentLocation, marker;
function initMap() {
    map = new google.maps.Map(document.getElementById('map'), {
      center: {lat: 51, lng: 0},
      zoom: 10,
      mapTypeId: google.maps.MapTypeId.HYBRID,
      draggableCursor: 'crosshair'
    });

// adds click function to store lat/long

    map.addListener('click', function(el) {
      placeMarkerAndPanTo(el.latLng, map);
      currentLocation = {
        lat: '' + el.latLng.lat(),
        lng: '' + el.latLng.lng()
      }

      console.log('currentLocation', currentLocation );
    });

}

// places ,arker on map and pans to given lat/long

function placeMarkerAndPanTo(latLng, map) {
  if(marker) {
    marker.setMap(null);
  }
  marker = new google.maps.Marker({
    position: latLng,
    map: map
  });

  map.panTo(latLng);
}

document.getElementById('map').addEventListener('click', function() {
  // var path = window.location.pathname;
  // console.log(!(path.indexOf('/meetup') > -1));
    if(!(window.location.pathname.indexOf('/meetup') > -1)){
      window.location.pathname += "/meetup";
      document.cookie="Latitude=" + currentLocation.lat;
      document.cookie="Longitude=" + currentLocation.lng;

    }
    else if (window.location.pathname.indexOf('/meetup') > -1){
      console.log('bonjour');
      document.cookie="Latitude=" + currentLocation.lat;
      document.cookie="Longitude=" + currentLocation.lng;
    }
});
