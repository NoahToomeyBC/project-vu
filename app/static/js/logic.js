// Add console.log to check to see if our code is working.
console.log("working");

// We create the tile layer that will be the background of our map.
let streets = L.tileLayer('https://api.mapbox.com/styles/v1/mapbox/streets-v11/tiles/{z}/{x}/{y}?access_token={accessToken}', {
	attribution: 'Map data &copy; <a href="https://www.openstreetmap.org/">OpenStreetMap</a> contributors, <a href="https://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, Imagery (c) <a href="https://www.mapbox.com/">Mapbox</a>',
	maxZoom: 18,
	accessToken: 'pk.eyJ1Ijoibnd0b29tZXkiLCJhIjoiY2t2cHQ4MDR2MTdxNDJwcXNpNzhydXp5eiJ9.1KcvtdVnT3wmH3Uzl9yRag'
});

// We create the second tile layer that will be the background of our map.
let satelliteStreets = L.tileLayer('https://api.mapbox.com/styles/v1/mapbox/satellite-streets-v11/tiles/{z}/{x}/{y}?access_token={accessToken}', {
	attribution: 'Map data &copy; <a href="https://www.openstreetmap.org/">OpenStreetMap</a> contributors, <a href="https://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, Imagery (c) <a href="https://www.mapbox.com/">Mapbox</a>',
	maxZoom: 18,
	accessToken: 'pk.eyJ1Ijoibnd0b29tZXkiLCJhIjoiY2t2cHQ4MDR2MTdxNDJwcXNpNzhydXp5eiJ9.1KcvtdVnT3wmH3Uzl9yRag'
});

// We create the second tile layer that will be the background of our map.
let light = L.tileLayer('https://api.mapbox.com/styles/v1/mapbox/light-v10/tiles/{z}/{x}/{y}?access_token={accessToken}', {
	attribution: 'Map data &copy; <a href="https://www.openstreetmap.org/">OpenStreetMap</a> contributors, <a href="https://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, Imagery (c) <a href="https://www.mapbox.com/">Mapbox</a>',
	maxZoom: 18,
	accessToken: 'pk.eyJ1Ijoibnd0b29tZXkiLCJhIjoiY2t2cHQ4MDR2MTdxNDJwcXNpNzhydXp5eiJ9.1KcvtdVnT3wmH3Uzl9yRag'
});

// Create the map object with center, zoom level and default layer.
let map = L.map('map', {
	center: [37.0902, -95.7129],
	zoom: 3,
	layers: [streets]
});

// Create a base layer that holds all three maps.
let baseMaps = {
  "Streets": streets,
  "Satellite": satelliteStreets,
  "Light": light
};

// 1. Add a 2nd layer group for the tectonic plate data.
let allEarthquakes = new L.LayerGroup();

let tectonicPlates = new L.LayerGroup();

let majorEarthquakes = new L.LayerGroup();

map.addLayer(tectonicPlates)
// 2. Add a reference to the tectonic plates group to the overlays object.
let overlays = {
  "Earthquakes": allEarthquakes,
  "Major Earthquakes": majorEarthquakes,
  "Tectonic Plates": tectonicPlates
};
// Then we add a control to the map that will allow the user to change which
// layers are visible.
L.control.layers(baseMaps, overlays).addTo(map);

// Retrieve the earthquake GeoJSON data.
L.geoJson("https://raw.githubusercontent.com/NoahToomeyBC/project-vu/main/app/static/master_geo.geojson").then(function(data) {
	function styleInfo(feature) {
		return {
		  opacity: 1,
		  fillOpacity: 1,
		  fillColor: getColor(feature.properties.percent_youth_someMH_2020),
		  color: "#000000",
		  radius: getRadius(feature.properties.percent_youth_someMH_2020),
		  stroke: true,
		  weight: 0.5
		};
	  }
  // This function determines the color of the marker based on the magnitude of the earthquake.
  function getColor(percent) {
    if (percent > 100) {
      return "#ea2c2c";
    }
    if (percent > 80) {
      return "#ea822c";
    }
    if (percent > 60) {
      return "#ee9c00";
    }
    if (percent > 40) {
      return "#eecc00";
    }
    if (percent > 20) {
      return "#d4ee00";
    }
    return "#98ee00";
  }

  // This function determines the radius of the earthquake marker based on its magnitude.
  // Earthquakes with a magnitude of 0 were being plotted with the wrong radius.
  function getRadius(percent_adult_uninsured_2020) {
    if (percent_adult_uninsured_2020 === 0) {
      return 1;
    }
    return percent_adult_uninsured_2020 * .5;
  }

  // Creating a GeoJSON layer with the retrieved data.
  L.geoJson(data, {
    	// We turn each feature into a circleMarker on the map.
    	pointToLayer: function(feature, latlng) {
      		console.log(data);
      		return L.circleMarker(latlng);
        },
      // We set the style for each circleMarker using our styleInfo function.
    style: styleInfo,
     // We create a popup for each circleMarker to display the magnitude and location of the earthquake
     //  after the marker has been created and styled.
     onEachFeature: function(feature, layer) {
      layer.bindPopup(`<h3>Rank:</h3> ${feature.properties.Rank_adult_uninsured_2020} <hr> <h3>Location</h3> ${feature.properties.State}`);
    }
}).addTo(allEarthquakes);
allEarthquakes.addTo(map);})
