// Load HTML
var NavHeader = document.getElementById('NavHeader');
NavHeader.innerHTML = "\
<div class='IconCol'>\
    <img id='previousBtn' class='icon clickable' src='../img/previous.svg'/>\
</div>\
<div class='HeaderTitle'>\
    "+document.title+"\
</div>\
";

// Setup button action
var previousBtn = document.getElementById("previousBtn");
previousBtn.onclick = function(){
    document.location.href = chrome.extension.getURL('../html/index.html');
}
                
