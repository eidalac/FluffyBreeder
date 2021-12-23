// Insert global js here

/* ------- CSS -------- */
importStyles('https://cdnjs.cloudflare.com/ajax/libs/font-awesome/4.7.0/css/font-awesome.min.css');

/* --- JavaScript --- */
/*importScripts("../bin/globals.js",);*/

/* ----- Utility ----- */

window.renderInfo = function(e) {
  var mq = window.matchMedia('(min-width: 767px)');
  const offsetX = 250;
  const offsetY = 250;
  const distanceX = (window.innerWidth - offsetX);
  const distanceY = (window.innerHeight - offsetY);
  let x = Math.max(Math.min(distanceX, e.pageX), offsetX)
  let y = Math.max(Math.min(distanceY, e.pageY), offsetY)
  if (mq.matches) {
    $('.info-container').css('left', `${x-offsetX}px`);
    $('.info-container').css('top', `${e.pageY}px`);
  } else {
    $('.info-container').css('top', `${e.pageY}px`);
  }
}

window.getInfo = function(info_id) {
  switch(info_id) {
    case 'attribute_trust':
      return `<b class="info-highlight">Trust</b> indicates how much the fluffy has bonded with you.<br> It increases by being fed well, and playing with the fluffy.`
    case 'attribute_happiness':
      return `<b class="info-highlight">Happiness</b> indicates the current mood of the fluffy.<br> It increases by being fed well, and playing with the fluffy.`
    case 'attribute_trauma':
      return `<b class="info-highlight">Trauma</b> indicates how much abuse the fluffy has endured.<br> It increases by not being fed, or abusing the fluffy.`
    case 'attribute_stress':
      return `<b class="info-highlight">Stress</b> indicates how well the fluffy can cope currently.<br> It increases by birthing or through training.`
    case 'attribute_training':
      return `<b class="info-highlight">Training</b> indicates how much influence you have over the fluffy.<br> It increases through training.`
    case 'attribute_temperament':
      return `<b class="info-highlight">Temperament</b> indicates how much energy the fluffy has.<br> It increases by being fed well, and playing with the fluffy.`
    case 'trait_feral':
      return `<b class="info-highlight">Feral</b> fluffies are fluffies that are not domesticated, or that have otherwise escaped or been released from care/captivity.`
    case 'trait_nearsighted':
      return `<b class="info-highlight">Nearsighted</b> fluffies have a harder time seeing details more than a few feet away.`
    case 'trait_colourblind':
      return `<b class="info-highlight">Colourblind</b> fluffies see a reduced range of colors.`
    case 'trait_feeble':
      return `<b class="info-highlight">Feeble</b> fluffies have a slight build and can't run and play as well as others.`
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