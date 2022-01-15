var stateBtn = document.getElementById("stateBtn");
var settingBtn = document.getElementById("settingsButton");
var histBtn = document.getElementById("histButton");
var blockCount = document.getElementById("bCount");

chrome.runtime.sendMessage({action: "getState"});

stateBtn.onclick = function(){
    chrome.runtime.sendMessage({action: "toggleState"});
}

settingBtn.onclick = function(){
    document.location.href = chrome.extension.getURL('../html/settings.html');
}

histBtn.onclick = function(){
    document.location.href = chrome.extension.getURL('../html/history.html');
}

chrome.runtime.onMessage.addListener(function(request, sender) {
    if (request.action == "setState") {
        if(request.state == null) return;

        if(request.state){
            stateBtn.style = "background-color: rgb(89, 155, 87); color: rgba(255, 255, 255, 0.8);";
            stateBtn.innerHTML = "On";
        }
        else{
            stateBtn.style = "background-color: rgb(50, 50, 50);";
            stateBtn.innerHTML = "Off";
        }
    }
    else if(request.action == "setCount"){
        if(!request.bCount) return;
        
        blockCount.innerHTML = request.bCount;
    }
});