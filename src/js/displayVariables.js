/*! <<checkvars>> macro for SugarCube 2.x */
!function(){"use strict";if("undefined"==typeof version||"undefined"==typeof version.title||"SugarCube"!==version.title||"undefined"==typeof version.major||version.major<2)throw new Error("<<checkvars>> macro requires SugarCube 2.0 or greater, aborting load");Macro.add("checkvars",{handler:function(){function toString(value,indent){var baseType=typeof value;switch(baseType){case"number":return isNaN(value)?"NaN":isFinite(value)?String(value):"Infinity";case"string":return JSON.stringify(value);case"function":return"(function)";default:if("object"!==baseType||null==value)return String(value);var objType=Object.prototype.toString.call(value);if("[object Date]"===objType)return'(object: Date, value: "'+value.toISOString()+'")';if("[object RegExp]"===objType)return"(object: RegExp, value: "+value.toString()+")";var opener,closer,result=[],indentText="  ";return indent||(indent=""),("[object Set]"===objType||value instanceof Set)&&(value=Array.from(value)),Array.isArray(value)?(opener="[\n",closer="\n"+indent+"]",value.forEach(function(p,i){result.push(indent+indentText+i+" ⇒ "+toString(value[i],indent+indentText))}),Object.keys(value).forEach(function(p){/^\d+$/.test(p)||result.push(indent+indentText+toString(p)+" ⇒ "+toString(value[p],indent+indentText))})):"[object Map]"===objType||value instanceof Map?(opener="{\n",closer="\n"+indent+"}",Array.from(value).map(function(kv){result.push(indent+indentText+toString(kv[0],indent+indentText)+" ⇒ "+toString(kv[1],indent+indentText))})):(opener="{\n",closer="\n"+indent+"}",Object.keys(value).forEach(function(p){result.push(indent+indentText+toString(p)+" ⇒ "+toString(value[p],indent+indentText))})),opener+result.join(",\n")+closer}}var dialog,sv=State.variables,names=Object.keys(sv);if(dialog=UI.setup("Story $variables","checkvars"),0===names.length)return dialog.innerHTML="<h1>Story $variables (<code>State.variables</code>):</h1><p><em>No $variables currently set…</em></p>",void UI.open();dialog.innerHTML="<h1>Story $variables (<code>State.variables</code>):</h1><table><thead><tr><th>Name</th><th>Value</th></tr></thead><tbody></tbody></table>"+(/applewebkit|chrome/.test(Browser.userAgent)?"":'<div class="scroll-pad">&nbsp;</div>');var tbody=dialog.querySelector("tbody");names.sort(function(a,b){return Util.isNumeric(a)&&Util.isNumeric(b)?Number(a)-Number(b):a.localeCompare(b)});for(var i=0;i<names.length;i++){var tr=document.createElement("tr"),tdName=document.createElement("td"),tdValue=document.createElement("td");tdName.textContent="$"+names[i],tdValue.textContent=toString(sv[names[i]]),tr.appendChild(tdName),tr.appendChild(tdValue),tbody.appendChild(tr)}UI.open()}})}();