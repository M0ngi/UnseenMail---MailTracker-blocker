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