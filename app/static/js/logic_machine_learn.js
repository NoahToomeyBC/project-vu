function prelimShowHideFunc() {
    var x = document.getElementById('prelimDiv');
    if (x.style.display === 'none') {
      x.style.display = 'block';
    } else {
      x.style.display = 'none';
    }
  }

function normalizehowHideFunc() {
  var x = document.getElementById('normalizeDIV');
  if (x.style.display === 'none') {
    x.style.display = 'block';
  } else {
    x.style.display = 'none';
  }
}

$("#postitemlocation").select2()

$("#clickme1").click(function() {
  $("#postitemlocation").select2("open");
  $("#clickme1").hide();
  $("#clickme2").show();
});

$("#clickme2").click(function() {
  $("#postitemlocation").select2("close");
  $("#clickme1").show();
  $("#clickme2").hide();
});

function setVisibility(id, visibility) {
document.getElementById(id).style.display = visibility;
}
