// Insert global js here

/* ------- CSS -------- */
importStyles('https://cdnjs.cloudflare.com/ajax/libs/font-awesome/4.7.0/css/font-awesome.min.css');

/* --- JavaScript --- */
/*importScripts("../bin/globals.js",);*/

/* -- Save Functions - */
Save.onLoad.add(function (save)
{
  if (typeof save.state.history[save.state.index].variables.grandmotherGene == 'undefined')
  {
    save.state.history[save.state.index].variables.grandmotherGene = "X/Y;A/a;B/b;C/c;E/e;F/f;G/g;H/h;J/j;K/k;M/m;N/n;S/s;X/x;E/e;P/a;U/a;B/b;Y/y;R/r;O/o;W/w;B/b;Y/y;R/r;O/o;W/w;B/b;Y/y;R/r;O/o;W/w;S/s;T/t;E/e;N/n;C/c;H/h;T/t;H/h;L/l;E/e;0/0;C/c;L/l;C/c;D/d;C/c;C/c;0/0";
  }

  if (typeof save.state.history[save.state.index].variables.grandfatherGene == 'undefined')
  {
    save.state.history[save.state.index].variables.grandfatherGene = "X/X;A/a;B/b;C/c;E/e;F/f;G/g;H/h;J/j;K/k;M/m;N/n;S/s;X/x;E/e;P/a;U/a;B/b;Y/y;R/r;O/o;W/w;B/b;Y/y;R/r;O/o;W/w;B/b;Y/y;R/r;O/o;W/w;S/s;T/t;E/e;N/n;C/c;H/h;T/t;H/h;L/l;E/e;0/0;C/c;L/l;C/c;D/d;C/c;C/c;0/0";
  }

  for (var i = 0; i < save.state.history[save.state.index].variables.globalFluffies.length; i++)
  {
    // Force set a default value to furStage if it's missing:
    if (typeof save.state.history[save.state.index].variables.globalFluffies[i].furStage == 'undefined')
    {
      save.state.history[save.state.index].variables.globalFluffies[i].furStage = 100;
    }

    // Set coat information if missing:
    if (typeof save.state.history[save.state.index].variables.globalFluffies[i].coatLengthAdd == 'undefined')
    {
      save.state.history[save.state.index].variables.globalFluffies[i].coatLengthAdd = 0;
    }
    if (typeof save.state.history[save.state.index].variables.globalFluffies[i].coatLength == 'undefined')
    {
      save.state.history[save.state.index].variables.globalFluffies[i].coatLength = 2;
    }
    if (typeof save.state.history[save.state.index].variables.globalFluffies[i].coatDensity == 'undefined')
    {
      save.state.history[save.state.index].variables.globalFluffies[i].coatDensity = 100;
    }
    if (typeof save.state.history[save.state.index].variables.globalFluffies[i].coatDensityAdd == 'undefined')
    {
      save.state.history[save.state.index].variables.globalFluffies[i].coatDensityAdd = 10;
    }
    if (typeof save.state.history[save.state.index].variables.globalFluffies[i].coatCurl == 'undefined')
    {
      save.state.history[save.state.index].variables.globalFluffies[i].coatCurl = 2;
    }

    if (typeof save.state.history[save.state.index].variables.ourStore.inventory == 'undefined')
    {
      save.state.history[save.state.index].variables.ourStore.inventory = [];
    }
  }
});
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
      case 'stat_strength':
        return '<b class="info-highlight">Strength</b> indicate general physical ability and coordination.'
      case 'stat_energy':
        return '<b class="info-highlight">Energy</b> indicate physical energy and endurance.'
      case 'stat_charm':
        return '<b class="info-highlight">Charm</b> is the general disposition and demeanor of a fluffy.'
      case 'stat_thinking':
        return '<b class="info-highlight">Thinking</b> is the general mental and reasoning ability.'
      case 'stat_learning':
        return '<b class="info-highlight">Learning</b> indicates how well a fluffy can learn new things.'
      case 'stat_fertility':
        return '<b class="info-highlight">Fertliity</b> indicates how many foals a fluffy may have as well as how much milk a mare can produce, and is averaged between the father and mother.'

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
        return `<b class="info-highlight">Feral</b> fluffies are fluffies that are not domesticated, or that have otherwise escaped or been released from care/captivity.<p>price <span style="color:darkred">-25%</span><p>`  

      /* Leg Defects */
      case 'trait_slow':
        return `<b class="info-highlight">Slow</b> fluffies unable to move quite as fast as others.<p>Energy: <span style="color:darkred">-1</span><p>`
      case 'trait_limp':
        return `<b class="info-highlight">Limp</b> fluffies have a perminate limp in one leg, limiting mobility.<p>Energy: <span style="color:darkred">-2</span>, Strength: <span style="color:darkred">-1</span><p>`
      case 'trait_lame':
        return `<b class="info-highlight">Lame</b> fluffies have at least one non functional leg and have a hard time getting around.<p>Energy: <span style="color:darkred">-3</span>, Strength: <span style="color:darkred">-1</span>, Charm: <span style="color:darkred">-1</span><p>`
      case 'trait_crippled':
        return `<b class="info-highlight">Crippled</b> fluffies are barely able to move without assistance.<p>Energy: <span style="color:darkred">-4</span>, Strength: <span style="color:darkred">-2</span>, Charm: <span style="color:darkred">-2</span><p>`

      /* Lung Defects */
      case 'trait_breathless':
        return `<b class="info-highlight">Breathless</b> fluffies have a slightly harder time breathing.<p>Energy: <span style="color:darkred">-1</span>, Strength: <span style="color:darkred">-1</span><p>`
      case 'trait_bronchitis':
        return `<b class="info-highlight">Bronchitis</b> This fluffy has frequent coughing and wheezing.<p>Energy: <span style="color:darkred">-2</span>, Strength: <span style="color:darkred">-2</span>, Charm: <span style="color:darkred">-1</span><p>`
      case 'trait_asthmatic':
        return `<b class="info-highlight">Asthmatic</b> fluffies have difficulty breathing, chest pains, cough, and wheezing.<p>Energy: <span style="color:darkred">-3</span>, Strength: <span style="color:darkred">-3</span>, Charm: <span style="color:darkred">-2</span><p>`
      case 'trait_lungcancer':
        return `<b class="info-highlight">Lung Cancer</b> This fluffy has long term cancer in it's lungs.<p>Energy: <span style="color:darkred">-4</span>, Strength: <span style="color:darkred">-4</span>, Charm: <span style="color:darkred">-3</span><p>`

      /* Weight Defects */
      case 'trait_chubby':
        return `<b class="info-highlight">Chubby</b> fluffies have a bit more fat under the fluff.<p>Energy: <span style="color:darkred">-1</span><p>`
      case 'trait_overweight':
        return `<b class="info-highlight">Overweight</b> fluffies have an unhealthy bulk to them.<p>Energy: <span style="color:darkred">-2</span>, Strength: <span style="color:darkred">-1</span><p>`
      case 'trait_fat':
        return `<b class="info-highlight">Fat</b> fluffies could be mistaken for a pregnant dame.<p>Energy: <span style="color:darkred">-3</span>, Strength: <span style="color:darkred">-1</span>, Charm: <span style="color:darkred">-1</span><p>`
      case 'trait_obese':
        return `<b class="info-highlight">Obese</b> fluffies are in dire need of a diet.<p>Energy: <span style="color:darkred">-4</span>, Strength: <span style="color:darkred">-2</span>, Charm: <span style="color:darkred">-2</span><p>`

      /* Heart Defects */
      case 'trait_weak':
        return `<b class="info-highlight">Weak</b> fluffies have little vigour.<p>Energy: <span style="color:darkred">-2</span>, Strength: <span style="color:darkred">-1</span><p>`
      case 'trait_feeble':
        return `<b class="info-highlight">Feeble</b> fluffies have a slight build and can't run and play as well as others.<p>Energy: <span style="color:darkred">-3</span>, Strength: <span style="color:darkred">-2</span><p>`
      case 'trait_sickly':
        return `<b class="info-highlight">Sickly</b> fluffies are almsot always ill.<p>Energy: <span style="color:darkred">-4</span>, Strength: <span style="color:darkred">-2</span>, Charm: <span style="color:darkred">-1</span><p>`
      case 'trait_anemic':
        return `<b class="info-highlight">Anemic</b> fluffies struggle to even eat, let alone play.<p>Energy: <span style="color:darkred">-4</span>, Strength: <span style="color:darkred">-4</span>, Charm: <span style="color:darkred">-2</span><p>`

      /* Growth defects */
      case 'trait_runt':
        return `<b class="info-highlight">Runts</b> are always undersized and will never be big and strong.<p>Growth Rate: <span style="color:darkred">reduced</span><p>`

      /* Stomach defect */
      case 'trait_delicate':
        return `<b class="info-highlight">Delicate</b> fluffies are picky eaters.<p>Thinking: <span style="color:darkred">-1</span>, Learning: <span style="color:darkred">-1</span><p>`
      case 'trait_nauseous':
        return `<b class="info-highlight">Nauseous</b> This fluffy gets ill from even kibble.<p>Thinking: <span style="color:darkred">-2</span>, Learning: <span style="color:darkred">-2</span>, Charm: <span style="color:darkred">-1</span><p>`
      case 'trait_ulcers':
        return `<b class="info-highlight">Ulcers</b> This fluffy has painfull ulcers.<p>Thinking: <span style="color:darkred">-3</span>, Learning: <span style="color:darkred">-3</span>, Charm: <span style="color:darkred">-2</span><p>`
      case 'trait_appendicitis':
        return `<b class="info-highlight">Appendicitis</b> This fluffy has a swollen appendix and is in constant pain.<p>Thinking: <span style="color:darkred">-4</span>, Learning: <span style="color:darkred">-4</span>, Charm: <span style="color:darkred">-3</span><p>`

      /* Mental defect */
      case 'trait_silly':
        return `<b class="info-highlight">Silly</b> fluffies easily ammused, even when they shouldn't be.<p>Learning: <span style="color:darkred">-1</span>, Thinking: <span style="color:darkred">-1</span><p>`
      case 'trait_simple':
        return `<b class="info-highlight">Simple</b> fluffies are dull minded, even by fluffy standards.<p>Learning: <span style="color:darkred">-2</span>, Thinking: <span style="color:darkred">-2</span>, Charm: <span style="color:darkred">-1</span><p>`
      case 'trait_moron':
        return `<b class="info-highlight">Moronic</b> fluffies are amazingly stupid.<p>Learning: <span style="color:darkred">-3</span>, Thinking: <span style="color:darkred">-3</span>, Charm: <span style="color:darkred">-1</span><p>`
      case 'trait_imbecile':
        return `<b class="info-highlight">Imbecilic</b> fluffies have never been troubled by a single thought.<p>Learning: <span style="color:darkred">-4</span>, Thinking: <span style="color:darkred">-4</span>, Charm: <span style="color:darkred">-2</span><p>`

      /* Eye defect */
      case 'trait_nearsighted':
        return `<b class="info-highlight">Nearsighted</b> fluffies have a harder time seeing details more than a few feet away.<p>Learning: <span style="color:darkred">-1</span><p>`
      case 'trait_colourblind':
        return `<b class="info-highlight">Colourblind</b> fluffies see a reduced range of colors.<p>Learning: <span style="color:darkred">-2</span>, Energy: <span style="color:darkred">-1</span><p>`
      case 'trait_nearblind':
        return `<b class="info-highlight">Near blind</b> fluffies have very limited vision and mostly see light and shadows.<p>Learning: <span style="color:darkred">-3</span>, Energy: <span style="color:darkred">-2</span>, Charm: <span style="color:darkred">-1</span><p>`
      case 'trait_blind':
        return `<b class="info-highlight">Blind</b> fluffies do not see.  At all.<p>Learning: <span style="color:darkred">-4</span>, Energy: <span style="color:darkred">-3</span>, Charm: <span style="color:darkred">-2</span><p>`

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

window.toggleButton = function (event, $dropdown = undefined) {
  $dropdown = !$dropdown ? $(this).siblings('div') : $dropdown
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

window.closeSubsort = function (event) {
  const title = $(this).find('button').html().replace(' <i class="fa fa-sort"></i>', '');
  const $parent = $(this).parent();
  const $parent_button = $parent.parent().find('button span');
  let parent_title = $parent_button.attr('data-title')
  parent_title = parent_title && parent_title != 0 ? $parent_button.attr('data-title') : $parent_button.html();

  toggleButton(event, $parent);
  $parent.parent().find('> button').html(`<span data-title="${parent_title}">${parent_title} - ${title}</span> <i class="fa fa-caret-down"></i>`)
}

window.removeTitle = function (event) {
  const icon = ' <i class="fa fa-caret-down"></i>'
  $('.dropdown-btn').each(function(i) {
    let title = $(this).find('span').attr('data-title')
    title = title && title != 0 ? title : $(this).find('span').html().replace(icon, '');
    $(this).html(`<span data-title="${title}">${title}</span> <i class="fa fa-caret-down"></i>`)
  })
}