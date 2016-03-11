

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
    });

}

// places marker on map and pans to given lat/long

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
    console.log(markersArr);
    markersArr.forEach(function(marker) {
        marker.setMap(null)
    });
    markersArr = [];
    document.cookie="Latitude=" + currentLocation.lat + "; path=/";
    document.cookie="Longitude=" + currentLocation.lng + "; path=/";
  var xhr = new XMLHttpRequest();

  xhr.onreadystatechange = function(res){
      if(res.target.status === 200 && res.target.readyState === 4){
            mapMeetups();

      }
  }
  xhr.open('GET', '/map/meetup',true);
  xhr.send();
});

var markersArr = [];

function mapMeetups(){
    var cookieLocs = document.cookie.split('AA')[1].split('Q');
    markersArr = cookieLocs.map(function(meetup){
        // console.log(Number(meetup.split('--')[0]));
        var marker = new google.maps.Marker({
            position: {lat: Number(meetup.split('Z')[0]), lng: Number(meetup.split('Z')[1])},
            map: map
        });
marker.setMap(map);
        return marker;
    });


}
