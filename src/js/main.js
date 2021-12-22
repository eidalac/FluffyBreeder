// Insert global js here

/* ----- Utility ----- */

window.renderInfo = function(e) {
  $('.info-container').css('left', `${e.pageX}px`);
  $('.info-container').css('top', `${e.pageY}px`);
}

window.getInfo = function(info_id) {
  switch(info_id) {
    case 'trait_feral':
      return `<b class="info-highlight">Feral</b> fluffies are fluffies that are not domesticated, or that have otherwise escaped or been released from care/captivity.`
    default:
      return `${info_id} has no info yet.`
  }
}

/* ----- Sidebar ----- */

window.openSidebar = function () {
  $('#mySidebar').addClass('active');
  $('#main').addClass('sidebar-active');
  $('#navHead').addClass('sidebar-active');
};
window.closeSidebar = function () {
  $('#mySidebar').removeClass('active');
  $('#main').removeClass('sidebar-active');
  $('#navHead').removeClass('sidebar-active');
};

window.showAccFunc = function () {
  var x = document.getElementById("showAcc");
  if (x.className.indexOf("w3-show") == -1) {
      x.className += " w3-show";
      x.previousElementSibling.className += " w3-grey";
  } else { 
      x.className = x.className.replace(" w3-show", "");
      x.previousElementSibling.className.replace(" w3-grey", "");
  }
};

window.sortAccFunc = function () {
  var x = document.getElementById("sortAcc");
  if (x.className.indexOf("w3-show") == -1) {
    x.className += " w3-show";
    x.previousElementSibling.className += " w3-grey";
  } else { 
    x.className = x.className.replace(" w3-show", "");
      x.previousElementSibling.className.replace(" w3-grey", "");
  }
};

window.toggleButton = function () {
  const $dropdown = $(this).siblings('div');
  if($dropdown.hasClass('w3-show')) {
    $dropdown.removeClass('w3-show w3-grey');
    $dropdown.addClass('w3-hide');
  } else if($dropdown.hasClass('w3-hide')) {
    $dropdown.addClass('w3-show w3-grey');
    $dropdown.removeClass('w3-hide');
  } else {
    $dropdown.removeClass('w3-hide');
  }
}