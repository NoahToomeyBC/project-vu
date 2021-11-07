console.log("testing")




// First chart data
var trace1 = {
    x: ["beer", "wine", "martini", "margarita",
      "ice tea", "rum & coke", "mai tai", "gin & tonic"],
    y: [22.7, 17.1, 9.9, 8.7, 7.2, 6.1, 6.0, 4.6],
    type: "bar"
  };
  
  var data = [trace1];
  
  var layout = {
    title: "'Bar' Chart",
  };
  
  Plotly.newPlot("bar", data, layout);





//   Second chart data
  var trace2 = {
  labels: ["beer", "wine", "martini", "margarita",
      "ice tea", "rum & coke", "mai tai", "gin & tonic"],
  values: [22.7, 17.1, 9.9, 8.7, 7.2, 6.1, 6.0, 4.6],
  type: 'pie'
};

var data = [trace2];

var layout = {
  title: "'Pie' Chart",
};

Plotly.newPlot("pie", data, layout);