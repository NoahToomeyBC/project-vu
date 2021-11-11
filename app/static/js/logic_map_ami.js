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
	center: [35.0902, -95.7129],
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

let employment2019 = new L.LayerGroup();

let employment2020 = new L.LayerGroup();

let allMentalIllness2019 = new L.LayerGroup();

let allMentalIllness2020 = new L.LayerGroup();

let allMentalIllness2021 = new L.LayerGroup();



// 2. Add a reference to the tectonic plates group to the overlays object.
let overlays = {
  "Employment Heat Map 2019": employment2019,
  "Employment Heat Map 2020": employment2020,
  "Employment Heat Map 2021": employment2021,
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
      fillColor: getColor(feature.properties.percent_ami_2019),
      color: "#000000",
      radius: getRadius(feature.properties.pop_ami_2019),
      stroke: true,
      weight: 0.5,
      pane: 'markerPane'
    };
  }
  
    // This function determines the color of the marker based on the magnitude of the earthquake.
    function getColor(percent) {
      if (percent > 24) {
        return "#ea2c2c";
      }
      if (percent > 22) {
        return "#ea822c";
      }
      if (percent > 20) {
        return "#ee9c00";
      }
      if (percent > 18) {
        return "#eecc00";
      }
      if (percent > 16) {
        return "#d4ee00";
      }
      return "#98ee00";
    }

      // This function determines the radius of the earthquake marker based on its magnitude.
  // Earthquakes with a magnitude of 0 were being plotted with the wrong radius.
  function getRadius(population) {
    if (population === 0) {
      return 1;
    }
    return population * .0001;
  }

  L.geoJson(data,{
 	// We turn each feature into a circleMarker on the map.
    	pointToLayer: function(feature, latlng) {
      		console.log(data);
          var marker = L.circleMarker(latlng);
          marker.on('mouseover',function() {
            marker.openPopup();
          });
      		return marker;
    
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
        fillColor: getColor(feature.properties.percent_adult_ami_2020),
        color: "#000000",
        radius: getRadius(feature.properties.pop_adult_ami_2020),
        weight: 0.5,
        pane: 'markerPane'
      };
    }
    
    // This function determines the color of the marker based on the magnitude of the earthquake.
    function getColor(percent) {
      if (percent > 24) {
        return "#ea2c2c";
      }
      if (percent > 22) {
        return "#ea822c";
      }
      if (percent > 20) {
        return "#ee9c00";
      }
      if (percent > 18) {
        return "#eecc00";
      }
      if (percent > 16) {
        return "#d4ee00";
      }
      return "#98ee00";
    }

      // This function determines the radius of the earthquake marker based on its magnitude.
  // Earthquakes with a magnitude of 0 were being plotted with the wrong radius.
  function getRadius(population) {
    if (population === 0) {
      return 1;
    }
    return population * .0001;
  }

  
    L.geoJson(data,{
     // We turn each feature into a circleMarker on the map.
        pointToLayer: function(feature, latlng) {
            console.log(data);
            var marker = L.circleMarker(latlng);
            marker.on('mouseover',function() {
              marker.openPopup();
            });
            return marker;
          },
        // We set the style for each circleMarker using our styleInfo function.
      style: styleInfo,
       // We create a popup for each circleMarker to display the magnitude and location of the earthquake
       //  after the marker has been created and styled.
       onEachFeature: function(feature, layer) {
        layer.bindPopup(" <b>State: " + feature.properties.State + 
        "<br> <b>Rank:</b> " + feature.properties.Rank_adult_ami_2020 +
        "<br><b>Population of Respondents:</b> " + feature.properties.pop_adult_ami_2020 +
        "<br><b>Percentage of Respondents:</b> " + feature.properties.percent_adult_ami_2020 +
        "<br> <b>Amount of Citizens Per Mental Health Care Worker (Approximate):</b> " + (feature.properties.healthcare_workers_per_person_2020 + feature.properties.healthcare_workers_per_person_2021) /2 );
      }
    }).addTo(allMentalIllness2020);
    $.getJSON(link,function(data){
      function styleInfo(feature) {
        return {
          opacity: 1,
          fillOpacity: 1,
          fillColor: getColor(feature.properties.percent_adult_ami_2021),
          color: "#000000",
          radius: getRadius(feature.properties.pop_adult_ami_2021),
          stroke: true,
          weight: 0.5,
          pane: 'markerPane'
        };
      }
      
    // This function determines the color of the marker based on the magnitude of the earthquake.
    function getColor(percent) {
      if (percent > 24) {
        return "#ea2c2c";
      }
      if (percent > 22) {
        return "#ea822c";
      }
      if (percent > 20) {
        return "#ee9c00";
      }
      if (percent > 18) {
        return "#eecc00";
      }
      if (percent > 16) {
        return "#d4ee00";
      }
      return "#98ee00";
    }

      // This function determines the radius of the earthquake marker based on its magnitude.
  // Earthquakes with a magnitude of 0 were being plotted with the wrong radius.
  function getRadius(population) {
    if (population === 0) {
      return 1;
    }
    return population * .0001;
  }

    
      L.geoJson(data,{
        // We turn each feature into a circleMarker on the map.
          pointToLayer: function(feature, latlng) {
              console.log(data);
              var marker = L.circleMarker(latlng);
              marker.on('mouseover',function() {
                marker.openPopup();
              });
              return marker;
            },
          // We set the style for each circleMarker using our styleInfo function.
        style: styleInfo,
          // We create a popup for each circleMarker to display the magnitude and location of the earthquake
          //  after the marker has been created and styled.
          onEachFeature: function(feature, layer) {
          layer.bindPopup("<b>State:</b> " + feature.properties.State + 
          "<br> <b>Rank:</b> " + feature.properties.Rank_adult_ami_2021 +
          "<br> <b>Population of Respondents:</b> " + feature.properties.pop_adult_ami_2021 +
          "<br><b>Percentage of Respondents:</b> " + feature.properties.percent_adult_ami_2021 +
          "<br> <b>Amount of Citizens Per Mental Health Care Worker:</b> " + feature.properties.healthcare_workers_per_person_2021  );
        }
        
  
    
      }).addTo(allMentalIllness2021);
      });
      
     
    });

    $.getJSON("https://raw.githubusercontent.com/NoahToomeyBC/project-vu/main/app/static/unemployment_2019.geojson",function(data){    
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
            function getColor(percentage) {
              if (percentage > .975) {
                return "#023858";
              }
              if (percentage > .97) {
                return "#045a8d";
              }
              if (percentage > .965) {
                return "#0570b0";
              }
              if (percentage > .96) {
                return "#3690c0";
              }
              if (percentage > .955) {
                return "#74a9cf";
              }
              if (percentage > .95) {
                return "#a6bddb";
              }
              if (percentage > .945) {
                return "d0d1e6";
              }
              if (percentage > .94) {
                return "ece7f2";
              }
              return "fff7fb";

            }
      }
      L.geoJson(data, {style: style}).addTo(employment2019);
      employment2019.addTo(map);
    });

    $.getJSON("https://raw.githubusercontent.com/NoahToomeyBC/project-vu/main/app/static/unemployment_2020.geojson",function(data){    
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
            function getColor(percentage) {
              if (percentage > .975) {
                return "#045a8d";
              }
              if (percentage > .97) {
                return "#3690c0";
              }
              if (percentage > .96) {
                return "#74a9cf";
              }
              if (percentage > .94) {
                return "#ece7f2";
              }
              if (percentage > .92) {
                return "#fff7fb";
              }
              if (percentage > .9) {
                return "#41ab5d";
              }
              if (percentage > .87) {
                return "238b45";
              }
              if (percentage > .85) {
                return "ece7f2";
              }
              return "006d2c";

            }
      }
      L.geoJson(data, {style: style}).addTo(employment2020);
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
            function getColor(percentage) {
              if (percentage > .975) {
                return "#023858";
              }
              if (percentage > .97) {
                return "#045a8d";
              }
              if (percentage > .965) {
                return "#0570b0";
              }
              if (percentage > .96) {
                return "#3690c0";
              }
              if (percentage > .955) {
                return "#74a9cf";
              }
              if (percentage > .95) {
                return "#a6bddb";
              }
              if (percentage > .945) {
                return "d0d1e6";
              }
              if (percentage > .94) {
                return "ece7f2";
              }
              return "fff7fb";

            }
      }
      L.geoJson(data, {style: style}).addTo(employment2021);
    });





