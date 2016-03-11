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
      console.log(currentLocation);
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
    locationsArray = [];
    document.cookie="Latitude=" + currentLocation.lat + "; path=/";
    document.cookie="Longitude=" + currentLocation.lng + "; path=/";
  var xhr = new XMLHttpRequest();

  xhr.onreadystatechange = function(res){
      if(res.target.status === 200 ){
            mapMeetups();
      }
  }
  xhr.open('GET', '/map/meetup',true);
  xhr.send();

    // if(!(window.location.pathname.indexOf('/meetup') > -1)){
    //   console.log();
    //
    // }
    // else if (window.location.pathname.indexOf('/meetup') > -1){
    //   console.log('bonjour');
    //   document.cookie="Latitude=" + currentLocation.lat + "; path=/";
    //   document.cookie="Longitude=" + currentLocation.lng+ "; path=/";
    // //   document.location.reload(true);
    // }
});
var locationsArray = [];



function mapMeetups(){
    // make array of map.locations('')
    var jsonData = document.getElementById('hiddenData').innerHTML;
    console.log('map meetups hit ');
    var obj = JSON.parse(jsonData);
    // console.log(obj);
    locationsArray = obj.map(function(meetup){
        var marker = new google.maps.Marker({
            // The below line is equivalent to writing:
            // position: new google.maps.LatLng(-34.397, 150.644)
            position: {lat: meetup.latitude, lng: meetup.longitude},
            map: map
        });
        return marker;
    });
    console.log(locationsArray);

    //populate map with new markers

}

// document.getElementById('map').addEventListener('click', function() {
//   // var path = window.location.pathname;
//   // console.log(!(path.indexOf('/meetup') > -1));
//     // if(!(window.location.pathname.indexOf('/meetup') > -1)){
//     //   console.log();
//     //   window.location.pathname += "/meetup";
//     //   document.cookie="Latitude=" + currentLocation.lat + ";path='/'";
//     //   document.cookie="Longitude=" + currentLocation.lng + ";path='/'";
//     //
//     // }
//     if (window.location.pathname.indexOf('/meetup') > -1){
//       console.log('------------',document.cookie);
//
//       document.cookie="Latitude=" + currentLocation.lat+ "; path=/";
//       document.cookie="Longitude=" + currentLocation.lng+ "; path=/";
//     }
// });
