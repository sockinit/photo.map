var script = document.createElement('script');
console.log('yayayaa!');
//
script.setAttribute('src', 'https://maps.googleapis.com/maps/api/js?key=' + secretkeys.map + '&signed_in=true&callback=initMap');
document.body.appendChild(script);

// function that creates map and shoves it on the screen

console.log(secretkeys.map);

var map;
function initMap() {
    map = new google.maps.Map(document.getElementById('map'), {
      center: {lat: -34.397, lng: 150.644},
      zoom: 8
    });
}
