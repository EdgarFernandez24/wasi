
var app = {
    // Application Constructor
    initialize: function() {
        document.addEventListener('deviceready', this.onDeviceReady.bind(this), false);
    },

    // deviceready Event Handler
    //
    // Bind any cordova events here. Common events are:
    // 'pause', 'resume', etc.
    onDeviceReady: function() {
        this.receivedEvent('deviceready');
    },

    // Update DOM on a Received Event
    receivedEvent: function(id) {
        alert("hola receivedEvent");
        //getMapLocation();
    }
};

app.initialize();
alert("hola app 1");
var Latitude = undefined;
var Longitude = undefined;
// Get geo coordinates
var customLabel = {restaurant: {label: 'R'}, bar: {label: 'B'},casa:{label: 'C'}};
function getMapLocation() {

    navigator.geolocation.getCurrentPosition(onMapSuccess, onMapError, { enableHighAccuracy: true });
    //alert("getMapLocation 2");
}
// Success callback for get geo coordinates
var onMapSuccess = function (position) {

    Latitude = position.coords.latitude;
    Longitude = position.coords.longitude;
    $('#lat').text(Latitude);
    $('#lon').text(Longitude);
    getMap(Latitude, Longitude);
    //alert("onMapSuccess 3");

}// Get map by using coordinates

function getMap(latitude, longitude) {

    var mapOptions = {
        center: new google.maps.LatLng(0, 0),
        zoom: 1,
        mapTypeId: google.maps.MapTypeId.ROADMAP
    };
    /*var mapOptionsP = {
        center: new google.maps.LatLng(latitude, longitude),
        zoom: 12,
       // mapTypeId: google.maps.MapTypeId.ROADMAP
    };*/
   var map = new google.maps.Map(document.getElementById("map"), mapOptions);


    var latLong = new google.maps.LatLng(latitude, longitude);

    var marker = new google.maps.Marker({position: latLong});

    marker.setMap(map);
    map.setZoom(15);
    map.setCenter(marker.getPosition());

//var map = new google.maps.Map(document.getElementById('map'),{center: new google.maps.LatLng(41.3720576, 2.1151744 ),zoom: 12 });
        var infoWindow = new google.maps.InfoWindow;

          // Change this depending on the name of your PHP or XML file
          downloadUrl('http://192.168.0.161/wasiWeb/php/marcas.php', function(data) {
            var xml = data.responseXML;
            var markers = xml.documentElement.getElementsByTagName('marker');
            Array.prototype.forEach.call(markers, function(markerElem) {
              var id = markerElem.getAttribute('id_p');
              var name = markerElem.getAttribute('nombre');
              var address = markerElem.getAttribute('dir');
              var type = markerElem.getAttribute('tipo');
              var point = new google.maps.LatLng(
                  parseFloat(markerElem.getAttribute('lat')),
                  parseFloat(markerElem.getAttribute('lng')));

              var infowincontent = document.createElement('div');
              var strong = document.createElement('strong');
              strong.textContent = name
              infowincontent.appendChild(strong);
              infowincontent.appendChild(document.createElement('br'));

              var text = document.createElement('text');
              text.textContent = address
              infowincontent.appendChild(text);
              var icon = customLabel[type] || {};
              var marker = new google.maps.Marker({
                map: map,
                position: point,
                label: icon.label
              });
              marker.addListener('click', function() {
                infoWindow.setContent(infowincontent);
                infoWindow.open(map, marker);
              });
            });
          });
        }
      function downloadUrl(url, callback) {
        var request = window.ActiveXObject ?
            new ActiveXObject('Microsoft.XMLHTTP') :
            new XMLHttpRequest;

        request.onreadystatechange = function() {
          if (request.readyState == 4) {
            request.onreadystatechange = doNothing;
            callback(request, request.status);
          }
        };

        request.open('GET', url, true);
        request.send(null);
}
// Success callback for watching your changing position

var onMapWatchSuccess = function (position) {

    var updatedLatitude = position.coords.latitude;
    var updatedLongitude = position.coords.longitude;

    if (updatedLatitude != Latitude && updatedLongitude != Longitude) {

        Latitude = updatedLatitude;
        Longitude = updatedLongitude;        
        getMap(updatedLatitude, updatedLongitude);
        //alert("onMapWatchSuccess 6");
    }
   // alert("onMapWatchSuccess 5");
}

// Error callback
function onMapError(error) {
    alert('code: ' + error.code + '\n' + 'message: ' + error.message + '\n');
}

function watchMapPosition() {
    
    return navigator.geolocation.watchPosition(onMapWatchSuccess, onMapError, { enableHighAccuracy: true });
    //alert("watchMapPosition 4");
}
// obtencio de datos de clima 
function getWeatherLocation() {

    navigator.geolocation.getCurrentPosition(onWeatherSuccess, onWeatherError, { enableHighAccuracy: true });
}
var onWeatherSuccess = function (position) {

    Latitude = position.coords.latitude;
    Longitude = position.coords.longitude;
    alert("lat"+ Latitude + "lon "+ Longitude);
    getWeather(Latitude, Longitude);
}

// Get weather by using coordinates

function getWeather(latitude, longitude) {

    // Get a free key at http://openweathermap.org/. Replace the "Your_Key_Here" string with that key.
    var OpenWeatherAppKey = "ac4af321583aa6f9cb9580218d463657";

    var queryString ='http://api.openweathermap.org/data/2.5/weather?lat=' + latitude + '&lon=' + longitude + '&appid=' + OpenWeatherAppKey + '&units=imperial';

    $.getJSON(queryString, function (results) {

        if (results.weather.length) {

            $.getJSON(queryString, function (results) {

                if (results.weather.length) {

                    $('#description').text(results.name);
                    $('#temp').text(((results.main.temp-32)/1.8).toFixed(1) +'º');
                    //$('#wind').text(results.wind.speed);
                    $('#humidity').text(results.main.humidity + '%');
                    //$('#visibility').text(results.weather[0].main);

                   /* var sunriseDate = new Date(results.sys.sunrise);
                    $('#sunrise').text(sunriseDate.toLocaleTimeString());

                    var sunsetDate = new Date(results.sys.sunrise);
                    $('#sunset').text(sunsetDate.toLocaleTimeString());*/
                }

            });
        }
    }).fail(function () {
        alert("error getting location");
    });
}

// Error callback

function onWeatherError(error) {
    alert('code: ' + error.code + '\n' +'message: ' + error.message + '\n');
}
// Watch your changing position

function watchWeatherPosition() {

    return navigator.geolocation.watchPosition(onWeatherWatchSuccess, onWeatherError, { enableHighAccuracy: true });
}




// Success callback for watching your changing position

var onWeatherWatchSuccess = function (position) {

    var updatedLatitude = position.coords.latitude;
    var updatedLongitude = position.coords.longitude;

    if (updatedLatitude != Latitude && updatedLongitude != Longitude) {

        Latitude = updatedLatitude;
        Longitude = updatedLongitude;

        // Calls function we defined earlier.
        getWeather(updatedLatitude, updatedLongitude);
    }
}

// insertar marcadores al un mapa 

 
       //function initMap() { }

      function doNothing() {}
