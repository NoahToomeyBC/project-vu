let map = L.map('mapid', {
	center: [37.0902, -95.7129],
	zoom: 3
});

// We create the tile layer that will be the background of our map.
let streets = L.tileLayer('https://api.mapbox.com/styles/v1/mapbox/dark-v10/tiles/{z}/{x}/{y}?access_token={accessToken}', {
attribution: 'Map data © <a href="https://www.openstreetmap.org/">OpenStreetMap</a> contributors, <a href="https://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, Imagery (c) <a href="https://www.mapbox.com/">Mapbox</a>',
    maxZoom: 18,
    accessToken: 'pk.eyJ1Ijoibnd0b29tZXkiLCJhIjoiY2t2cHQ4MDR2MTdxNDJwcXNpNzhydXp5eiJ9.1KcvtdVnT3wmH3Uzl9yRag'
});

L.geoJson(data, {
    pointToLayer: function(feature, latlng) {
      return L.marker(latlng);
     }
});

// Get data from cities.js
L.geoJson("https://raw.githubusercontent.com/NoahToomeyBC/project-vu/main/app/static/master_geo.geojson").

// Then we add our 'graymap' tile layer to the map.
streets.addTo(map);