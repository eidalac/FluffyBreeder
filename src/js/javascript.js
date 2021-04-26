


function openSidebar() {
	document.getElementById("mySidebar").style.width = "20%";
	document.getElementById("main").style.marginLeft = "25%";
	document.getElementById("mySidebar").style.display = "block";
	document.getElementById("openNav").style.display = 'none';
	document.getElementById("navHead").style.marginLeft = "30%";
}

function closeSidebar() {
	document.getElementById("mySidebar").style.display = "none";
	document.getElementById("main").style.marginLeft = "0%";
	document.getElementById("mySidebar").style.display = "none";
	document.getElementById("openNav").style.display = "inline-block";
	document.getElementById("navHead").style.marginLeft = "0%";
}

function showAccFunc() {
  var x = document.getElementById("showAcc");
  if (x.className.indexOf("w3-show") == -1) {
    x.className += " w3-show";
    x.previousElementSibling.className += " w3-grey";
  } else { 
    x.className = x.className.replace(" w3-show", "");
     x.previousElementSibling.className.replace(" w3-grey", "");
  }
}



function subFoodAccFunc (type) {
  if (type == "kibble") {
  	var x = document.getElementById("subFoodAccKibble");
  } else if (type == "greens") {
  	var x = document.getElementById("subFoodAccGreens");
 } else if (type == "formula") {
    var x = document.getElementById("subFoodAccFormula");
 } else if (type == "sketti") {
    var x = document.getElementById("subFoodAccSketti");
 } else if (type == "nothing") {
    var x = document.getElementById("subFoodAccNothing");
 } 
  if (x.className.indexOf("w3-show") == -1) {
    x.className += " w3-show";
    x.previousElementSibling.className += " w3-grey";
  } else { 
    x.className = x.className.replace(" w3-show", "");
    x.previousElementSibling.className = 
    x.previousElementSibling.className.replace(" w3-grey", "");
  }
}

function subSortAccFunc(type) {
  if (type == "breed") {
  	var x = document.getElementById("subSortAccBreed");
  } else if (type == "age") {
  	var x = document.getElementById("subSortAccAge");
 } else if (type == "gender") {
    var x = document.getElementById("subSortAccGender");
 } else if (type == "stats") {
    var x = document.getElementById("subSortAccStat");
 } else if (type == "attributes") {
    var x = document.getElementById("subSortAccAtt");
 } else if (type == "bulk") {
    var x = document.getElementById("subSortAccBulk");
 } else if (type == "kill") {
    var x = document.getElementById("subSortAccKill");
 } else if (type == "food") {
    var x = document.getElementById("subSortAccFood");
  }
  if (x.className.indexOf("w3-show") == -1) {
    x.className += " w3-show";
    x.previousElementSibling.className += " w3-grey";
  } else { 
    x.className = x.className.replace(" w3-show", "");
    x.previousElementSibling.className = 
    x.previousElementSibling.className.replace(" w3-grey", "");
  }
}