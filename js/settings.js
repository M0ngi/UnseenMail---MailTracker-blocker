var maxHist = document.getElementById('maxHist');
var validateBtn = document.getElementById('validateBtn');

chrome.storage.sync.get(['settings'], function(res){
    maxHist.value = res.settings.maxhist;
});

validateBtn.onclick = function(){
    chrome.storage.sync.get(['settings'], function(res){
        res.settings.maxhist = Number(maxHist.value);

        chrome.storage.sync.set({settings: res.settings});
        document.location.href = chrome.extension.getURL('index.html');
    });
}