/*
    Copyright (C) 2022  Mohamed Mongi Saidane

    This program is free software: you can redistribute it and/or modify
    it under the terms of the GNU General Public License as published by
    the Free Software Foundation, either version 3 of the License, or
    (at your option) any later version.

    This program is distributed in the hope that it will be useful,
    but WITHOUT ANY WARRANTY; without even the implied warranty of
    MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
    GNU General Public License for more details.

    You should have received a copy of the GNU General Public License
    along with this program.  If not, see <https://www.gnu.org/licenses/>.
    
    Author contact: saidanemongi@gmail.com
*/

var histBody = document.getElementById('histBody');
var clearBtn = document.getElementById('clearBtn');

chrome.storage.onChanged.addListener(function(changes, namespace) {
    if(changes.history){
        histBody.innerHTML = "";
        for(let i=changes.history.newValue.count-1; i>=0; i--){
            histBody.innerHTML += "\
            <div class='clickable histRow'>\
            <div class='col '>" +
            (changes.history.newValue[i].length > 35 ? changes.history.newValue[i].substr(0, 35) + "..." : changes.history.newValue[i])
            + "</div></div>";
        }
    }
});

chrome.storage.local.get(['history'], function(res){
    histBody.innerHTML = "";
    for(let i=res.history.count-1; i>=0; i--){
        histBody.innerHTML += "\
        <div class='clickable histRow'>\
        <div class='col'>" +
        (res.history[i].length > 35 ? res.history[i].substr(0, 35) + "..." : res.history[i])
        + "</div></div>";
    }
});

clearBtn.onclick = function(){
    chrome.runtime.sendMessage({action: "resetState"});
}
