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

var state = true;
var bCount = 0;

var settings = {
    maxhist: 15,
    blockedUrls : [
        "https://my-email-signature.link/signature.gif",
        "://mailtrack.io"
    ]
}

var callback = function(details) {
    if(!state) return;
    if(details.initiator != "https://mail.google.com" || details.type != "image" || details.method != "GET") return;
    
    settings.blockedUrls.forEach(url => {
        if(details.url.search(url) != -1){
            if(settings.maxhist == 0) return {cancel: true};
            
            bCount++;
            if(bCount >= settings.maxhist){
                bCount = 0;
                chrome.storage.local.set({'history': {count: 0}});
            }
            chrome.runtime.sendMessage({action: "setCount", bCount:bCount});

            // Update history
            chrome.storage.local.get(['history'], function(result){
                result.history[result.history.count] = details.url;
                result.history.count++;

                chrome.storage.local.set(result);
            });
            return {cancel: true};
        }
    });
};

var filter = {urls: ["https://*/*", "http://*/*"]};

chrome.storage.local.set({'history': {count: 0}});

chrome.webRequest.onBeforeRequest.addListener(
    callback, 
    filter,
    ['blocking']
);

chrome.runtime.onMessage.addListener(function(request, sender) {
    if (request.action == "toggleState") {
        chrome.runtime.sendMessage({action: "setState", state:!state});
        state = !state;
    }
    else if(request.action == "getState"){
        chrome.runtime.sendMessage({action: "setState", state:state});
        chrome.runtime.sendMessage({action: "setCount", bCount:bCount});
    }
    else if(request.action == "resetState"){
        bCount = 0;
        chrome.storage.local.set({'history': {count: 0}});
    }
});

chrome.storage.sync.get(['settings'], function(res){
    if(!res.settings){
        chrome.storage.sync.set({'settings':settings});
    }
    else{
        settings = res.settings;
    }
});
