/* mousetrap v1.5.3 craig.is/killing/mice */
(function(C,r,g){function t(a,b,h){a.addEventListener?a.addEventListener(b,h,!1):a.attachEvent("on"+b,h)}function x(a){if("keypress"==a.type){var b=String.fromCharCode(a.which);a.shiftKey||(b=b.toLowerCase());return b}return l[a.which]?l[a.which]:p[a.which]?p[a.which]:String.fromCharCode(a.which).toLowerCase()}function D(a){var b=[];a.shiftKey&&b.push("shift");a.altKey&&b.push("alt");a.ctrlKey&&b.push("ctrl");a.metaKey&&b.push("meta");return b}function u(a){return"shift"==a||"ctrl"==a||"alt"==a||
"meta"==a}function y(a,b){var h,c,e,g=[];h=a;"+"===h?h=["+"]:(h=h.replace(/\+{2}/g,"+plus"),h=h.split("+"));for(e=0;e<h.length;++e)c=h[e],z[c]&&(c=z[c]),b&&"keypress"!=b&&A[c]&&(c=A[c],g.push("shift")),u(c)&&g.push(c);h=c;e=b;if(!e){if(!k){k={};for(var m in l)95<m&&112>m||l.hasOwnProperty(m)&&(k[l[m]]=m)}e=k[h]?"keydown":"keypress"}"keypress"==e&&g.length&&(e="keydown");return{key:c,modifiers:g,action:e}}function B(a,b){return null===a||a===r?!1:a===b?!0:B(a.parentNode,b)}function c(a){function b(a){a=
a||{};var b=!1,n;for(n in q)a[n]?b=!0:q[n]=0;b||(v=!1)}function h(a,b,n,f,c,h){var g,e,l=[],m=n.type;if(!d._callbacks[a])return[];"keyup"==m&&u(a)&&(b=[a]);for(g=0;g<d._callbacks[a].length;++g)if(e=d._callbacks[a][g],(f||!e.seq||q[e.seq]==e.level)&&m==e.action){var k;(k="keypress"==m&&!n.metaKey&&!n.ctrlKey)||(k=e.modifiers,k=b.sort().join(",")===k.sort().join(","));k&&(k=f&&e.seq==f&&e.level==h,(!f&&e.combo==c||k)&&d._callbacks[a].splice(g,1),l.push(e))}return l}function g(a,b,n,f){d.stopCallback(b,
b.target||b.srcElement,n,f)||!1!==a(b,n)||(b.preventDefault?b.preventDefault():b.returnValue=!1,b.stopPropagation?b.stopPropagation():b.cancelBubble=!0)}function e(a){"number"!==typeof a.which&&(a.which=a.keyCode);var b=x(a);b&&("keyup"==a.type&&w===b?w=!1:d.handleKey(b,D(a),a))}function l(a,c,n,f){function e(c){return function(){v=c;++q[a];clearTimeout(k);k=setTimeout(b,1E3)}}function h(c){g(n,c,a);"keyup"!==f&&(w=x(c));setTimeout(b,10)}for(var d=q[a]=0;d<c.length;++d){var p=d+1===c.length?h:e(f||
y(c[d+1]).action);m(c[d],p,f,a,d)}}function m(a,b,c,f,e){d._directMap[a+":"+c]=b;a=a.replace(/\s+/g," ");var g=a.split(" ");1<g.length?l(a,g,b,c):(c=y(a,c),d._callbacks[c.key]=d._callbacks[c.key]||[],h(c.key,c.modifiers,{type:c.action},f,a,e),d._callbacks[c.key][f?"unshift":"push"]({callback:b,modifiers:c.modifiers,action:c.action,seq:f,level:e,combo:a}))}var d=this;a=a||r;if(!(d instanceof c))return new c(a);d.target=a;d._callbacks={};d._directMap={};var q={},k,w=!1,p=!1,v=!1;d._handleKey=function(a,
c,e){var f=h(a,c,e),d;c={};var k=0,l=!1;for(d=0;d<f.length;++d)f[d].seq&&(k=Math.max(k,f[d].level));for(d=0;d<f.length;++d)f[d].seq?f[d].level==k&&(l=!0,c[f[d].seq]=1,g(f[d].callback,e,f[d].combo,f[d].seq)):l||g(f[d].callback,e,f[d].combo);f="keypress"==e.type&&p;e.type!=v||u(a)||f||b(c);p=l&&"keydown"==e.type};d._bindMultiple=function(a,b,c){for(var d=0;d<a.length;++d)m(a[d],b,c)};t(a,"keypress",e);t(a,"keydown",e);t(a,"keyup",e)}var l={8:"backspace",9:"tab",13:"enter",16:"shift",17:"ctrl",18:"alt",
20:"capslock",27:"esc",32:"space",33:"pageup",34:"pagedown",35:"end",36:"home",37:"left",38:"up",39:"right",40:"down",45:"ins",46:"del",91:"meta",93:"meta",224:"meta"},p={106:"*",107:"+",109:"-",110:".",111:"/",186:";",187:"=",188:",",189:"-",190:".",191:"/",192:"`",219:"[",220:"\\",221:"]",222:"'"},A={"~":"`","!":"1","@":"2","#":"3",$:"4","%":"5","^":"6","&":"7","*":"8","(":"9",")":"0",_:"-","+":"=",":":";",'"':"'","<":",",">":".","?":"/","|":"\\"},z={option:"alt",command:"meta","return":"enter",
escape:"esc",plus:"+",mod:/Mac|iPod|iPhone|iPad/.test(navigator.platform)?"meta":"ctrl"},k;for(g=1;20>g;++g)l[111+g]="f"+g;for(g=0;9>=g;++g)l[g+96]=g;c.prototype.bind=function(a,b,c){a=a instanceof Array?a:[a];this._bindMultiple.call(this,a,b,c);return this};c.prototype.unbind=function(a,b){return this.bind.call(this,a,function(){},b)};c.prototype.trigger=function(a,b){if(this._directMap[a+":"+b])this._directMap[a+":"+b]({},a);return this};c.prototype.reset=function(){this._callbacks={};this._directMap=
{};return this};c.prototype.stopCallback=function(a,b){return-1<(" "+b.className+" ").indexOf(" mousetrap ")||B(b,this.target)?!1:"INPUT"==b.tagName||"SELECT"==b.tagName||"TEXTAREA"==b.tagName||b.isContentEditable};c.prototype.handleKey=function(){return this._handleKey.apply(this,arguments)};c.init=function(){var a=c(r),b;for(b in a)"_"!==b.charAt(0)&&(c[b]=function(b){return function(){return a[b].apply(a,arguments)}}(b))};c.init();C.Mousetrap=c;"undefined"!==typeof module&&module.exports&&(module.exports=
c);"function"===typeof define&&define.amd&&define(function(){return c})})(window,document);

Mousetrap.bind("enter", function () {
	$("#story-caption #endWeekButton a.macro-link").trigger("click");
});
Mousetrap.bind("space", function () {
	$("#story-caption #nextButton a.macro-link").trigger("click");
});
Mousetrap.bind("c", function () {
	$("#story-caption #manageArcology a.macro-link").trigger("click");
});
Mousetrap.bind("p", function () {
	$("#story-caption #managePenthouse a.macro-link").trigger("click");
});
Mousetrap.bind("left", function () {
	$("#prevSlave a.macro-link").trigger("click");
	$("#prevRule a").trigger("click");
});
Mousetrap.bind("q", function () {
	$("#prevSlave a.macro-link").trigger("click");
	$("#prevRule a").trigger("click");
});
Mousetrap.bind("shift+left", function () {
	$("#firstRule a").trigger("click");
});
Mousetrap.bind("shift+q", function () {
	$("#firstRule a").trigger("click");
});
Mousetrap.bind("right", function () {
	$("#nextSlave a.macro-link").trigger("click");
	$("#nextRule a").trigger("click");
});
Mousetrap.bind("shift+right", function () {
	$("#lastRule a").trigger("click");
});
Mousetrap.bind("e", function () {
	$("#nextSlave a.macro-link").trigger("click");
	$("#nextRule a").trigger("click");
});
Mousetrap.bind("shift+e", function () {
	$("#lastRule a").trigger("click");
});
Mousetrap.bind("f", function () {
	$("#walkpast a.macro-link").trigger("click");
});
Mousetrap.bind("h", function () {
	$("#manageHG a.macro-link").trigger("click");
});
Mousetrap.bind("s", function () {
	$("#buySlaves a.macro-link").trigger("click");
});
Mousetrap.bind("a", function () {
	$("#managePA a.macro-link").trigger("click");
});
Mousetrap.bind("b", function () {
	$("#manageBG a.macro-link").trigger("click");
});
Mousetrap.bind("u", function () {
	$("#manageRecruiter a.macro-link").trigger("click");
});
Mousetrap.bind("o", function () {
	$("#story-caption #optionsButton a.macro-link").trigger("click");
});
Mousetrap.bind("y", function () {
	$("#story-caption #policyButton a.macro-link").trigger("click");
});
Mousetrap.bind("f", function () {
	$("#story-caption #FSButton a.macro-link").trigger("click");
});
Mousetrap.bind("t", function () {
	$("#story-caption #PAOButton a.macro-link").trigger("click");
});
Mousetrap.bind("v", function () {
	$("#story-caption #URButton a.macro-link").trigger("click");
});
Mousetrap.bind("r", function () {
	$("#RAButton a.macro-link").trigger("click");
});

/**
 * BoobGenerator namespace.
 */
if (typeof BoobGenerator == "undefined") {
	var BoobGenerator = {
		rollBreast: function (modif) {
			var volume = [0, 300, 500, 650, 800, 1000, 1200, 1400, 1600, 1800, 2050, 2300, 2600, 2900, 3250, 3600, 3950, 4300, 4700, 5100, 5500, 5900];
			var volume_dist = [90000, 470000, 720000, 840000, 908574, 947759, 970151, 982946, 990258, 994436, 996824, 998188, 998968, 999414, 999669, 999814, 999897, 999945, 999972, 999987, 999995, 1000000];
			var randomRoll = Math.floor(Math.random() * 1000000) + 1
			var actualSize = 0
			while (randomRoll > volume_dist[actualSize]) {
				actualSize = actualSize + 1
			}
			var minorSizeAdjustment = 0
			if (Math.random()<.5) {
				minorSizeAdjustment = (Math.floor(Math.random() * 2) + 1) * 50
			}
			var volResult = volume[actualSize] + minorSizeAdjustment + modif
			if (volResult < 0) {volResult = 0}
			return volResult
		}
	};
	// Raise namespace scope to Global.
	window.BoobGenerator = BoobGenerator;
};

/**
 * Slave checker namespace.
 */
if (typeof SlaveStatsChecker == "undefined") {
	var SlaveStatsChecker = {
		checkForLisp: function (slave) {
			return ((slave.lips > 70) || (slave.lipsPiercing + slave.tonguePiercing > 2))
		}
	};
	// Raise namespace scope to Global.
	window.SlaveStatsChecker = SlaveStatsChecker;
};

window.removeFromArray = function(arr, val) {
	for (var i = 0; i < arr.length; i++) {
		if (val == arr[i])
			return arr.splice(i,1);
	}
	return null;
};

window.filterInPlace = function(arr, callback, thisArg) {
	var j = 0;

	arr.forEach(function(e, i) {
		if (callback.call(thisArg, e, i, arr))
			arr[j++] = e;
	});

	arr.length = j;
	return arr;
};

window.canGetPregnant = function(slave) {
	if (!slave) {
		return null;
	} else if (slave.preg == -1) { /* contraceptives check */
		return false;
	} else if (isFertile(slave) == false) { /* check other fertility factors */
		return false;
	} else if ((slave.ovaries == 1) && (canDoVaginal(slave) == true)) {
		return true;
	} else {
		return false;
	}
};

/* assuming slave1 is fertile, could slave2 impregnate slave1? slave2 must have dick and balls; both slaves must not be in chastity; slave2 need not achieve erection */
window.canImpreg = function(slave1, slave2) {
	if (!slave1 || !slave2) {
		return null;
	} else if (slave2.dick < 1) {
		return false;
	} else if (slave2.balls < 1) {
		return false;
	} else if (slave2.dickAccessory == "chastity") {
		return false;
	} else if (slave2.dickAccessory == "combined chastity") {
		return false;
	} else if (canGetPregnant(slave1) == false) { /* includes chastity checks */
		return false;
	} else {
		return true;
	}
};

/* contraceptives (.preg == -1) do not negate this function */
window.isFertile = function(slave) {
	if (!slave) {
		return null;
	} else if (slave.preg > 0) { /* currently pregnant */
		return false;
	} else if (slave.preg < -1) { /* sterile */
		return false;
	} else if (slave.ovaries == 1) {
		return true;
	} else {
		return false;
	}
};

window.canAchieveErection = function(slave) {
	if (!slave) {
		return null;
	} else if (slave.dick < 7 && slave.dick > 0 && (slave.balls > 0 ? slave.hormones <= 0 : slave.hormones < 0)) {
		return true;
	} else {
		return false;
	}
};

window.canPenetrate = function(slave) {
	if (!slave) {
		return null;
	} else if (canAchieveErection(slave) == false) {
		return false;
	} else if (slave.dickAccessory == "chastity") {
		return false;
	} else if (slave.dickAccessory == "combined chastity") {
		return false;
	} else if (slave.dick > 7) {
		return false;
	}
	return true;
};

window.canSee = function(slave) {
	if (!slave) {
		return null;
	} else if (slave.eyes > -2) {
		return true;
	} else {
		return false;
	}
};

window.canWalk = function(slave) {
	if (!slave) {
		return null;
	} else if (slave.amp == 1)  {
		return false;
	} else if (slave.boobs > 30000+(slave.muscles*100)) {
		return false;
	} else if (slave.heels == 0) {
		return true;
	} else if (slave.shoes == "heels") {
		return true;
	} else if (slave.shoes == "extreme heels") {
		return true;
	} else if (slave.shoes == "boots") {
		return true;
	} else {
		return false;
	}
};

window.canTalk = function(slave) {
	if (!slave) {
		return null;
	} else if (slave.accent > 2)  {
		return false;
	} else if (slave.voice == 0) {
		return false;
	} else if (slave.lips > 95) {
		return false;
	} else if (slave.collar == "dildo gag") {
		return false;
	} else if (slave.collar == "massive dildo gag") {
		return false;
	} else if (slave.collar == "ball gag") {
		return false;
	} else if (slave.collar == "bit gag") {
		return false;
	} else {
		return true;
	}
};

window.canDoAnal = function(slave) {
	if (!slave) {
		return null;
	} else if (slave.vaginalAccessory == "anal chastity") {
		return false;
	} else if (slave.dickAccessory == "anal chastity") {
		return false;
	} else if (slave.vaginalAccessory == "combined chastity") {
		return false;
	} else if (slave.dickAccessory == "combined chastity") {
		return false;
	}
	return true;
};

window.canDoVaginal = function(slave) {
	if (!slave) {
		return null;
	} else if (slave.vagina < 0) {
		return false;
	} else if (slave.vaginalAccessory == "chastity belt") {
		return false;
	} else if (slave.vaginalAccessory == "combined chastity") {
		return false;
	}
	return true;
};

window.relationTargetWord = function(slave) {
	if (!slave) {
		return null;
	} else if (slave.relation == "daughter") {
		return "mother";
	} else if (slave.relation == "mother") {
		return "daughter";
	}
	return slave.relation;
};

window.ruleApplied = function(slave, ID) {
	if (!slave || !slave.currentRules)
		return null;
	return slave.currentRules.includes(ID);
};

window.expandFacilityAssignments = function(facilityAssignments) {
	var assignmentPairs = {
		"serve in the club": "be the DJ",
		"rest in the spa": "be the Attendant",
		"work in the brothel": "be the Madam",
		"work in the dairy": "be the Milkmaid",
		"work as a servant": "be the Stewardess",
		"get treatment in the clinic": "be the Nurse",
		"live with your Head Girl": "be your Head Girl",
		"serve in the master suite": "be your Concubine",
		"learn in the schoolroom": "be the Schoolteacher",
		"be confined in the cellblock": "be the Wardeness",
	};

	if (!facilityAssignments || !facilityAssignments.length)
		return [];
	var fullList = facilityAssignments.map(function(a) {
		if (a in assignmentPairs)
			return [a, assignmentPairs[a]];
		return a;
	});
	return fullList.flatten();
};

window.ruleAssignmentSelected = function(slave, rule) {
	if (!slave || !rule || (!rule.assignment && !rule.facility))
		return false;
	var assignment = rule.assignment.concat(expandFacilityAssignments(rule.facility));
	return assignment.includes(slave.assignment);
}

window.ruleAssignmentExcluded = function(slave, rule) {
	if (!slave || !rule || (!rule.excludeAssignment && !rule.excludeFacility))
		return false;
	var excludeAssignment = rule.excludeAssignment.concat(expandFacilityAssignments(rule.excludeFacility));
	return excludeAssignment.includes(slave.assignment);
}

window.ruleSlaveSelected = function(slave, rule) {
	if (!slave || !rule || !rule.selectedSlaves)
		return false;
	return rule.selectedSlaves.includes(slave.ID);
};

window.ruleSlaveExcluded = function(slave, rule) {
	if (!slave || !rule || !rule.excludedSlaves)
		return false;
	return rule.excludedSlaves.includes(slave.ID);
};

window.hasSurgeryRule = function(slave, rules) {
	if (!slave || !rules || !slave.currentRules)
		return false;

	for (var d = rules.length-1; d >= 0; d--) {
		if (ruleApplied(slave, rules[d].ID)) {
			if (rules[d].autoSurgery > 0) {
				return true;
			}
		}
	}
	return false;
};

window.hasRuleFor = function(slave, rules, what) {
	if (!slave || !rules || !slave.currentRules)
		return false;

	for (var d = rules.length-1; d >= 0; d--) {
		if (ruleApplied(slave, rules[d].ID)) {
			if (rules[d][what] !== "no default setting") {
				return true;
			}
		}
	}
	return false;
};

window.hasHColorRule = function(slave, rules) {
	return hasRuleFor(slave, rules, "hColor");
}

window.hasHStyleRule = function(slave, rules) {
	return hasRuleFor(slave, rules, "hStyle");
};

window.hasEyeColorRule = function(slave, rules) {
	return hasRuleFor(slave, rules, "eyeColor");
};

window.lastPregRule = function(slave, rules) {
	if (!slave || !rules)
		return null;
	if (!slave.currentRules)
		return false;

	for (var d = rules.length-1; d >= 0; d--) {
		if (ruleApplied(slave, rules[d].ID)) {
			if (rules[d].preg == -1) {
				return true;
			}
		}
	}

	return null;
};

window.lastSurgeryRuleFor = function(slave, rules, what) {
	if (!slave || !rules || !slave.currentRules)
		return null;

	for (var d = rules.length-1; d >= 0; d--) {
		if (!rules[d].surgery)
			return null;

		if (ruleApplied(slave, rules[d].ID)) {
			if (rules[d].surgery[what] != "no default setting") {
				return rules[d];
			}
		}
	}

	return null;
};

window.lastEyesSurgeryRule = function(slave, rules) {
	return lastSurgeryRuleFor(slave, rules, "eyes");
}

window.lastLactationSurgeryRule = function(slave, rules) {
	return lastSurgeryRuleFor(slave, rules, "lactation");
}

window.lastProstateSurgeryRule = function(slave, rules) {
	return lastSurgeryRuleFor(slave, rules, "prostate");
}

window.lastLipSurgeryRule = function(slave, rules) {
	return lastSurgeryRuleFor(slave, rules, "lips");
};

window.lastBoobSurgeryRule = function(slave, rules) {
	return lastSurgeryRuleFor(slave, rules, "boobs");
};

window.lastButtSurgeryRule = function(slave, rules) {
	return lastSurgeryRuleFor(slave, rules, "butt");
};

window.milkAmount = function(slave) {
	var milk;
	var calcs;
	if (!slave) {
		return null;
	} else {
		calcs = slave.boobs-slave.boobsImplant
		if (calcs > 25000) {
			milk = (128+((calcs-10000)/500))
		} else if (calcs > 10000) {
			milk = (78+((calcs-10000)/300))
		} else if (calcs > 5000) {
			milk = (53+((calcs-5000)/200))
		} else if (calcs > 2000) {
			milk = (29+((calcs-2000)/125))
		} else if (calcs > 800) {
			milk = (16+((calcs-800)/80))
		} else {
			milk = (8+((calcs-400)/50))
		}
		if (slave.lactation == 2) {
			milk *= 1.2
		}
		milk += (milk*((slave.devotion-50)/200))
		if (slave.boobsImplant > 200) {
			milk *= 0.9
		}
		calcs = slave.hormones
		if (slave.balls != 0 && calcs > -2) {
			calcs -= 1
		} else if (slave.ovaries != 1 && calcs < 2) {
			calcs += 1
		}
		milk *= (1+(calcs*0.1))
		milk *= (1+(slave.preg/100))
		milk *= (1+(slave.health/50))
		milk *= (1+(slave.weight/500))
		milk *= (1+(slave.lactationAdaptation/500))
		milk = Math.trunc(milk)
		milk = Math.clamp(milk,1,10000)
		return milk
	}
};

window.cumAmount = function(slave) {
	var cum = 0;
	var calcs = 0;
	if (!slave) {
		return null;
	} else {
		if (slave.drugs == "testicle enhancement") {
			cum = ((slave.balls*3.5)+1)
		} else {
			cum = ((slave.balls*2.5)+1)
		}
		calcs = slave.hormones
		cum *= (1-(calcs*0.1))
		if (slave.scrotum == 0) {
			cum *= 0.8
		}
		if (slave.prostate == 0) {
			cum *= 0.8
		} else if (slave.prostate == 2) {
			cum *= 1.2
		}
		if (slave.devotion > 50) {
			cum += (cum*(slave.devotion/100))
		} else if (slave.devotion < -50) {
			cum += (cum*(slave.devotion/100))
		}
		if (slave.health > 50) {
			cum += (cum*(slave.health/50))
		} else if (slave.health < -50) {
			cum += (cum*(slave.health/50))
		}
		cum = Math.trunc(cum)
		cum = Math.clamp(cum,1,10000)
		return cum
	}
};


window.mergeRules = function(rules) {
    var combinedRule = {};

    for (var i = 0; i < rules.length; i++) {
        for (var prop in rules[i]) {
            // we don't manage setAssignment here, we do it in <<DefaultRules>>
            if (prop === "setAssignment")
                continue;

            // A rule overrides any preceding ones if,
            //   * there are no preceding ones,
            //   * or it sets autoBrand,
            //   * or it does not set autoBrand and is not "no default setting"
            var applies = (
                combinedRule[prop] === undefined
                || (prop === "autoBrand" && rules[i][prop])
                || (prop !== "autoBrand" && rules[i][prop] !== "no default setting")
            );

            if (applies)
                combinedRule[prop] = rules[i][prop];
        }
    }

    return combinedRule;
}

