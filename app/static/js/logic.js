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
	accessToken: 'pk.eyJ1Ijoibnd0b29tZXkiLCJhIjoiY2t2cHQ4MDR2MTdxNDJwcXNpNzhydXp5eiJ9.1KcvtdVnT3wmH3Uzl9yRag',
});

// Create the map object with center, zoom level and default layer.
let map = L.map('map', {
	center: [37.0902, -95.7129],
	zoom: 5,
	layers: [streets],
});



// Create a base layer that holds all three maps.
let baseMaps = {
  "Streets": streets,
  "Satellite": satelliteStreets,
  "Light": light
};

// 1. Add a 2nd layer group for the tectonic plate data.
let employment2021 = new L.LayerGroup();

let allMentalIllness2019 = new L.LayerGroup();

let allMentalIllness2020 = new L.LayerGroup();

let allMentalIllness2021 = new L.LayerGroup();



// 2. Add a reference to the tectonic plates group to the overlays object.
let overlays = {
  "Employment Heat Map": employment2021,
  "All Mental Illness 2019": allMentalIllness2019,
  "All Mental Illness 2020": allMentalIllness2020,
  "All Mental Illness 2021": allMentalIllness2021

};
// Then we add a control to the map that will allow the user to change which
// layers are visible.
L.control.layers(baseMaps, overlays).addTo(map);

link = "https://raw.githubusercontent.com/NoahToomeyBC/project-vu/main/app/static/master_geo.geojson"

$.getJSON(link,function(data){
  function styleInfo(feature) {
    return {
      opacity: 1,
      fillOpacity: 1,
      fillColor: getColor(feature.properties.pop_ami_2019),
      color: "#000000",
      radius: getRadius(feature.properties.percent_ami_2019),
      stroke: true,
      weight: 0.5,
      pane: 'markerPane'
    };
  }
  
    // This function determines the color of the marker based on the magnitude of the earthquake.
    function getColor(population) {
      if (population > 500000) {
        return "#ea2c2c";
      }
      if (population > 400000) {
        return "#ea822c";
      }
      if (population > 300000) {
        return "#ee9c00";
      }
      if (population > 200000) {
        return "#eecc00";
      }
      if (population > 100000) {
        return "#d4ee00";
      }
      return "#98ee00";
    }

      // This function determines the radius of the earthquake marker based on its magnitude.
  // Earthquakes with a magnitude of 0 were being plotted with the wrong radius.
    function getRadius(percent) {
      if (percent === 0) {
        return 1;
      }
      return percent * 1;
    }

  L.geoJson(data,{
 	// We turn each feature into a circleMarker on the map.
    	pointToLayer: function(feature, latlng) {
      		console.log(data);
      		return L.circleMarker(latlng);
        },
      // We set the style for each circleMarker using our styleInfo function.
    style: styleInfo,
     // Create Circle popups
     onEachFeature: function(feature, layer) {
      layer.bindPopup(" <b>State:</b> " + feature.properties.State + 
      "<br> <b>Rank:</b> " + feature.properties.Rank_ami_2019 +
      "<br> <b>Population of Respondents:</b> " + feature.properties.pop_ami_2019 +
      "<br> <b>Percentage of Respondents:</b> " + feature.properties.percent_ami_2019 );
    }
  }).addTo(allMentalIllness2019);
    allMentalIllness2019.addTo(map);
  });

  $.getJSON(link,function(data){
    function styleInfo(feature) {
      return {
        opacity: 1,
        fillOpacity: 1,
        fillColor: getColor(feature.properties.pop_ami_2020),
        color: "#000000",
        radius: getRadius(feature.properties.percent_ami_2020),
        weight: 0.5,
        pane: 'markerPane'
      };
    }
    
      // This function determines the color of the marker based on the magnitude of the earthquake.
      function getColor(population) {
        if (population > 500000) {
          return "#ea2c2c";
        }
        if (population > 400000) {
          return "#ea822c";
        }
        if (population > 300000) {
          return "#ee9c00";
        }
        if (population > 200000) {
          return "#eecc00";
        }
        if (population > 100000) {
          return "#d4ee00";
        }
        return "#98ee00";
      }
  
        // This function determines the radius of the earthquake marker based on its magnitude.
    // Earthquakes with a magnitude of 0 were being plotted with the wrong radius.
      function getRadius(percent) {
        if (percent === 0) {
          return 1;
        }
        return percent * 1;
      }
  
    L.geoJson(data,{
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
        layer.bindPopup(" <b>State: " + feature.properties.State + 
        "<br> <b>Rank:</b> " + feature.properties.Rank_ami_2020 +
        "<br><b>Population of Respondents:</b> " + feature.properties.pop_ami_2020 +
        "<br><b>Percentage of Respondents:</b> " + feature.properties.percent_ami_2020 );
      }
    }).addTo(allMentalIllness2020);
     
    });
    $.getJSON("https://raw.githubusercontent.com/NoahToomeyBC/project-vu/main/app/static/unemployment_2021.geojson",function(data){    
      function style(feature) {
        return {
              fillColor: getColor(feature.properties.employmentRate),
              weight: 2,
              opacity: 6,
              color: 'white',
              dashArray: '3',
              fillOpacity: 0.6
          };
            // This function determines the color of the marker based on the magnitude of the earthquake.
            function getColor(population) {
              if (population > .96) {
                return "#ea2c2c";
              }
              if (population > .94) {
                return "#ea822c";
              }
              if (population > .95) {
                return "#ee9c00";
              }
              if (population > .945) {
                return "#eecc00";
              }
              if (population > .94) {
                return "#d4ee00";
              }
              return "#98ee00";
            }
      }
      L.geoJson(data, {style: style}).addTo(employment2021);
      employment2021.addTo(map)
    });
    
  $.getJSON(link,function(data){
    function styleInfo(feature) {
      return {
        opacity: 1,
        fillOpacity: 1,
        fillColor: getColor(feature.properties.pop_adult_ami_2021),
        color: "#000000",
        radius: getRadius(feature.properties.percent_adult_ami_2021),
        stroke: true,
        weight: 0.5,
        pane: 'markerPane'
      };
    }
    
      // This function determines the color of the marker based on the magnitude of the earthquake.
      function getColor(population) {
        if (population > 500000) {
          return "#ea2c2c";
        }
        if (population > 400000) {
          return "#ea822c";
        }
        if (population > 300000) {
          return "#ee9c00";
        }
        if (population > 200000) {
          return "#eecc00";
        }
        if (population > 100000) {
          return "#d4ee00";
        }
        return "#98ee00";
      }
  
        // This function determines the radius of the earthquake marker based on its magnitude.
    // Earthquakes with a magnitude of 0 were being plotted with the wrong radius.
      function getRadius(percent) {
        if (percent === 0) {
          return 1;
        }
        return percent * 1;
      }
  
    L.geoJson(data,{
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
        layer.bindPopup("<b>State:</b> " + feature.properties.State + 
        "<br> <b>Rank:</b> " + feature.properties.Rank_adult_ami_2021 +
        "<br> <b>Population of Respondents:</b> " + feature.properties.pop_adult_ami_2021 +
        "<br><b>Percentage of Respondents:</b> " + feature.properties.percent_adult_ami_2021 );
      }

  
    }).addTo(allMentalIllness2021);
    });





