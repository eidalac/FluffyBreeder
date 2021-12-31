// Insert global js here
/* ----- CONFIG ------ */

// Allow only 5000 iterations
Config.macros.maxLoopIterations = 5000;

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
    // Update the nursing from a count to an array:
    if (typeof save.state.history[save.state.index].variables.globalFluffies[i].nursing === 'number')
    {
      // How many children does this fluffy have?
      var cCount = save.state.history[save.state.index].variables.globalFluffies[i].children.length;

      if (cCount <= 0)
      {
        // No kids, just make it an empty array:
        save.state.history[save.state.index].variables.globalFluffies[i].nursing = [];
      }
      else 
      {
        // If we have more kids than the number nursing, just pick the youngest.
        if (cCount > save.state.history[save.state.index].variables.globalFluffies[i].nursing)
        {
          cCount = Number(Number(cCount) - Number(save.state.history[save.state.index].variables.globalFluffies[i].nursing));
        }

        // Start with a blank array:
        save.state.history[save.state.index].variables.globalFluffies[i].nursing = [];

        // Push the children in revrse order to get youngest first:
        for (;cCount > 0; cCount--)
        {
          save.state.history[save.state.index].variables.globalFluffies[i].nursing.push(save.state.history[save.state.index].variables.globalFluffies[i].children[cCount]);
        }
      }
    }

    // Set color info if we are using old style data
    if (typeof save.state.history[save.state.index].variables.globalFluffies[i].cColor === 'string' ||
    typeof save.state.history[save.state.index].variables.globalFluffies[i].mColor === 'string' ||
    typeof save.state.history[save.state.index].variables.globalFluffies[i].eColor === 'string')
    {
      save.state.history[save.state.index].variables.globalFluffies[i].coatModifer = Math.floor(Math.random() * (28 - 0) + 0);
      save.state.history[save.state.index].variables.globalFluffies[i].maneModifer = Math.floor(Math.random() * (28 - 0) + 0);
      save.state.history[save.state.index].variables.globalFluffies[i].eyeModifer = Math.floor(Math.random() * (28 - 0) + 0);
      
      save.state.history[save.state.index].variables.globalFluffies[i].genes = Genome.fromString(save.state.history[save.state.index].variables.globalFluffies[i].geneString);

      save.state.history[save.state.index].variables.globalFluffies[i].cColor = save.state.history[save.state.index].variables.globalFluffies[i].genes.newCoatColorObject(save.state.history[save.state.index].variables.globalFluffies[i].coatModifer);
      save.state.history[save.state.index].variables.globalFluffies[i].mColor = save.state.history[save.state.index].variables.globalFluffies[i].genes.newManeColorObject(save.state.history[save.state.index].variables.globalFluffies[i].maneModifer);
      save.state.history[save.state.index].variables.globalFluffies[i].eColor = save.state.history[save.state.index].variables.globalFluffies[i].genes.newEyeColorObject(save.state.history[save.state.index].variables.globalFluffies[i].eyeModifer);

      var hslCoat = hexToHSL(save.state.history[save.state.index].variables.globalFluffies[i].cColor.hex);
      var hslMane = hexToHSL(save.state.history[save.state.index].variables.globalFluffies[i].mColor.hex);
      var hslEyes = hexToHSL(save.state.history[save.state.index].variables.globalFluffies[i].eColor.hex);
      
      save.state.history[save.state.index].variables.globalFluffies[i].colorGroup = ["", "", ""];
  
      for (let k = 0; k < window.groupList.length-2; k++)
      {
          if (inRange(hslCoat[0].toFixed(0), groupList[k].hue, groupList[k+1].hue))
          {
            save.state.history[save.state.index].variables.globalFluffies[i].colorGroup[0] = groupList[k].name
          }
          else if (hslCoat[0].toFixed(0) >= groupList[groupList.length-1].hue)
          {
            save.state.history[save.state.index].variables.globalFluffies[i].colorGroup[0] = groupList[groupList.length-1].name;
          }

          if (inRange(hslMane[0].toFixed(0), groupList[k].hue, groupList[k+1].hue))
          {
            save.state.history[save.state.index].variables.globalFluffies[i].colorGroup[1] = groupList[k].name;
          }
          else if (hslMane[0].toFixed(0) >= groupList[groupList.length-1].hue)
          {
            save.state.history[save.state.index].variables.globalFluffies[i].colorGroup[1] = groupList[groupList.length-1].name;
          }

          if (inRange(hslEyes[0].toFixed(0), groupList[k].hue, groupList[k+1].hue))
          {
            save.state.history[save.state.index].variables.globalFluffies[i].colorGroup[2] = groupList[k].name;
          }
          else if (hslEyes[0].toFixed(0) >= groupList[groupList.length-1].hue)
          {
            save.state.history[save.state.index].variables.globalFluffies[i].colorGroup[2] = groupList[groupList.length-1].name;
          }
      }

      save.state.history[save.state.index].variables.globalFluffies[i].cColor.filter = hexToFilter(save.state.history[save.state.index].variables.globalFluffies[i].cColor.hex);
      save.state.history[save.state.index].variables.globalFluffies[i].mColor.filter = hexToFilter(save.state.history[save.state.index].variables.globalFluffies[i].mColor.hex);
      save.state.history[save.state.index].variables.globalFluffies[i].eColor.filter = hexToFilter(save.state.history[save.state.index].variables.globalFluffies[i].eColor.hex);
    }

    // Force set a default value to furStage if it's missing:
    if (typeof save.state.history[save.state.index].variables.globalFluffies[i].furStage == 'undefined')
    {
      save.state.history[save.state.index].variables.globalFluffies[i].furStage = 100;
    }

    const expected_length = save.state.history[save.state.index].variables.grandfatherGene.length;
    if (typeof save.state.history[save.state.index].variables.globalFluffies[i].geneString.length < expected_length)
    {
      console.log(`DEBUG: onLoad: appending genenome ID ${save.state.history[save.state.index].variables.globalFluffies[i].ID}`);
      var addStr = save.state.history[save.state.index].variables.grandfatherGene.subString(save.state.history[save.state.index].variables.globalFluffies[i].geneString.length);
      console.log(`DEBUG: onLoad: appending genenome is ${addStr}`);

      save.state.history[save.state.index].variables.globalFluffies[i].geneString += addStr;
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

    if (typeof save.state.history[save.state.index].variables.globalFluffies[i].coatModifer == 'undefined')
    {
      save.state.history[save.state.index].variables.globalFluffies[i].coatModifer = 0;
    }
    if (typeof save.state.history[save.state.index].variables.globalFluffies[i].maneModifer == 'undefined')
    {
      save.state.history[save.state.index].variables.globalFluffies[i].maneModifer = 0;
    }
    if (typeof save.state.history[save.state.index].variables.globalFluffies[i].eyeModifer == 'undefined')
    {
      save.state.history[save.state.index].variables.globalFluffies[i].eyeModifer = 0;
    }
  
  }

  if (typeof save.state.history[save.state.index].variables.ourStore.inventory == 'undefined')
  {
    save.state.history[save.state.index].variables.ourStore.inventory = [];
  }
});

/* ----- Utility ----- */

window.renderInfo = function(e) {
  var mq = window.matchMedia('(min-width: 767px)');
  const offsetX = mq.matches ? 250 : 250;
  const offsetY = 250;
  const distanceX = (window.innerWidth - offsetX);
  const distanceY = (window.innerHeight - offsetY);
  let x = Math.max(Math.min(distanceX, e.pageX), offsetX)
  let y = Math.max(Math.min(distanceY, e.pageY), offsetY)
  if (mq.matches) {
    $('.info-container').css('left', `${x-offsetX}px`);
    $('.info-container').css('top', `${e.pageY}px`);
  } else {
    $('.info-container').css('left', `${x-offsetX}px`);
    $('.info-container').css('top', `${e.pageY}px`);
  }
}

window.getInfo = function(infokd) {
    switch(infokd) {
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
      case 'trait_tired':
        return `<b class="info-highlight">Breathless</b> fluffies are barely getting sleep.<p>Energy: <span style="color:darkred">-1</span>, Strength: <span style="color:darkred">-1</span><p>`
      case 'trait_breathless':
        return `<b class="info-highlight">Breathless</b> fluffies have a hard time breathing.<p>Energy: <span style="color:darkred">-2</span>, Strength: <span style="color:darkred">-2</span>, Charm: <span style="color:darkred">-1</span><p>`
      case 'trait_stertorous':
        return `<b class="info-highlight">Asthmatic</b> fluffies have difficulty breathing, cough, and wheeze.<p>Energy: <span style="color:darkred">-3</span>, Strength: <span style="color:darkred">-3</span>, Charm: <span style="color:darkred">-2</span><p>`
      case 'trait_exhausted':
        return `<b class="info-highlight">Exhausted</b> fluffies are unable to get anything done.<p>Energy: <span style="color:darkred">-4</span>, Strength: <span style="color:darkred">-4</span>, Charm: <span style="color:darkred">-3</span><p>`

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
        return `<b class="info-highlight">Sickly</b> fluffies are almost always ill.<p>Energy: <span style="color:darkred">-4</span>, Strength: <span style="color:darkred">-2</span>, Charm: <span style="color:darkred">-1</span><p>`
      case 'trait_anemic':
        return `<b class="info-highlight">Anemic</b> fluffies struggle to even eat, let alone play.<p>Energy: <span style="color:darkred">-4</span>, Strength: <span style="color:darkred">-4</span>, Charm: <span style="color:darkred">-2</span><p>`

      /* Growth defects */
      case 'trait_runt':
        return `<b class="info-highlight">Runts</b> are always undersized and will never be big and strong.<p>Growth Rate: <span style="color:darkred">reduced</span><p>`

      /* Stomach defect */
      case 'trait_delicate':
        return `<b class="info-highlight">Delicate</b> fluffies are picky eaters.<p>Thinking: <span style="color:darkred">-1</span>, Learning: <span style="color:darkred">-1</span><p>`
      case 'trait_squeamish':
        return `<b class="info-highlight">Nauseous</b> fluffies get sick easily and throw up a lot.<p>Thinking: <span style="color:darkred">-2</span>, Learning: <span style="color:darkred">-2</span>, Charm: <span style="color:darkred">-1</span><p>`
      case 'trait_anxious':
        return `<b class="info-highlight">Anxious</b> fluffies are permanently uneasy.<p>Thinking: <span style="color:darkred">-3</span>, Learning: <span style="color:darkred">-3</span>, Charm: <span style="color:darkred">-2</span><p>`
      case 'trait_fearful':
        return `<b class="info-highlight">Fearful</b> fluffies are terrified by literally everything.<p>Thinking: <span style="color:darkred">-4</span>, Learning: <span style="color:darkred">-4</span>, Charm: <span style="color:darkred">-3</span><p>`

      /* Mental defect */
      case 'trait_silly':
        return `<b class="info-highlight">Silly</b> fluffies easily amused, even when they shouldn't be.<p>Learning: <span style="color:darkred">-1</span>, Thinking: <span style="color:darkred">-1</span><p>`
      case 'trait_simple':
        return `<b class="info-highlight">Simple</b> fluffies are dull minded, even by fluffy standards.<p>Learning: <span style="color:darkred">-2</span>, Thinking: <span style="color:darkred">-2</span>, Charm: <span style="color:darkred">-1</span><p>`
      case 'trait_moron':
        return `<b class="info-highlight">Moronic</b> fluffies are amazingly stupid.<p>Learning: <span style="color:darkred">-3</span>, Thinking: <span style="color:darkred">-3</span>, Charm: <span style="color:darkred">-1</span><p>`
      case 'trait_imbecile':
        return `<b class="info-highlight">Imbecilic</b> fluffies have never been troubled by a single thought.<p>Learning: <span style="color:darkred">-4</span>, Thinking: <span style="color:darkred">-4</span>, Charm: <span style="color:darkred">-2</span><p>`

      /* Eye defect */
      case 'trait_careless':
        return `<b class="info-highlight">Careless</b> fluffies are prone to accidents.<p>Learning: <span style="color:darkred">-1</span><p>`
      case 'trait_unaware':
        return `<b class="info-highlight">Unaware</b> fluffies have a hard time noticing issues.<p>Learning: <span style="color:darkred">-2</span>, Energy: <span style="color:darkred">-1</span><p>`
      case 'trait_oblivious':
        return `<b class="info-highlight">Oblivious</b> fluffies are almost entirely unaware of their surroundings.<p>Learning: <span style="color:darkred">-3</span>, Energy: <span style="color:darkred">-2</span>, Charm: <span style="color:darkred">-1</span><p>`
      case 'trait_blind':
        return `<b class="info-highlight">Blind</b> fluffies do not see.  At all.<p>Learning: <span style="color:darkred">-4</span>, Energy: <span style="color:darkred">-3</span>, Charm: <span style="color:darkred">-2</span><p>`

      default:
        return `${infokd} has no info yet.`
  }
}

/* ----- Sidebar ----- */

window.openSidebar = function () {
  $('#sidebar').addClass('active');
  $('#main').addClass('sidebar-active');
  $('#navHead').addClass('sidebar-active');
};
window.closeSidebar = function () {
  $('#sidebar').removeClass('active');
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

window.hexToFilter = function (hex) {
  if(typeof hex === 'string') {
    const rgb = hexToRgb(hex);
    if (rgb.length !== 3) {
      alert('Invalid format!');
      return;
    }
    const color = new Color(rgb[0], rgb[1], rgb[2]);
    const solver = new Solver(color);
    const result = solver.solve();
    return result.filter;
  } else {
    console.log("DEBUG: Hex is not a string:", hex)
  }
}

window.hexToHSL = function (hex) {
  const rgb = hexToRgb(hex);
  let [r, g, b] = [rgb[0], rgb[1], rgb[2]]
  r /= 255;
  g /= 255;
  b /= 255;
  const l = Math.max(r, g, b);
  const s = l - Math.min(r, g, b);
  const h = s
    ? l === r
      ? (g - b) / s
      : l === g
      ? 2 + (b - r) / s
      : 4 + (r - g) / s
    : 0;
  return [
    60 * h < 0 ? 60 * h + 360 : 60 * h,
    100 * (s ? (l <= 0.5 ? s / (2 * l - s) : s / (2 - (2 * l - s))) : 0),
    (100 * (2 * l - s)) / 2,
  ];
};

window.hexColorDelta = function(hex1, hex2) {
  // get red/green/blue int values of hex1
  const rgb1 = hexToRgb(hex1);
  let [r1, g1, b1] = [rgb1[0], rgb1[1], rgb1[2]]
  // get red/green/blue int values of hex2
  const rgb2 = hexToRgb(hex2);
  let [r2, g2, b2] = [rgb2[0], rgb2[1], rgb2[2]]
  // calculate differences between reds, greens and blues
  var r = 255 - Math.abs(r1 - r2);
  var g = 255 - Math.abs(g1 - g2);
  var b = 255 - Math.abs(b1 - b2);
  // limit differences between 0 and 1
  r /= 255;
  g /= 255;
  b /= 255;
  // 0 means opposite colors, 1 means same colors
  return (r + g + b) / 3;
}

window.closestIndex = (num, arr) => {
  let curr = arr[0], diff = Math.abs(num - curr);
  let index = 0;
  for (let val = 0; val < arr.length; val++) {
     let newdiff = Math.abs(num - arr[val]);
     if (newdiff < diff) {
      diff = newdiff;
      curr = arr[val];
      index = val;
     };
  };
  return index;
};

window.getLuminance = (hex) => {
  const hexstr = hex.replace('#','');
  const [r, g, b] = [parseInt(hexstr.substring(0, 2), 16), parseInt(hexstr.substring(2, 4), 16), parseInt(hexstr.substring(4, 6), 16)];

  return (0.2126*r + 0.7152*g + 0.0722*b);
}

window.inRange = function(x, min, max) {
  return ((x-min)*(x-max) <= 0);
}