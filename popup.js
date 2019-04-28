document.addEventListener('DOMContentLoaded', function () {
    var facebookArray = ['https://www.google.com', 'https://www.amazon.com', 'https://www.google.com'];
    var googleArray = ['https://www.google.com', 'https://www.amazon.com', 'https://www.google.com'];
    var redditArray = ['https://www.google.com', 'https://www.amazon.com', 'https://www.google.com'];
    var pintrestArray = ['https://www.google.com', 'https://www.amazon.com', 'https://www.google.com'];

    $("#count1").click(()=>{
        loadUrls(facebookArray,0);
    });
    $("#count2").click(() => {
        loadUrls(googleArray,0);
        
    });
    $("#count3").click(() => {
        loadUrls(redditArray,0);
        
    });
    $("#count4").click(() => {
        loadUrls(pintrestArray,0);
    });
function loadUrls(arr,i){
    console.log(arr,i);
    chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
        //getting tabid
        var tab = tabs[0];
        //updatinng the tab url
        chrome.tabs.update(tab.id, { url: arr[i] },()=>{
            chrome.tabs.onUpdated.addListener((tabid, changedInfo) =>{
                //listener for when loading is complete
                if (changedInfo.status === "complete") {
                    console.log("complete");
                    chrome.tabs.sendMessage(tabs[0].id, { greeting:"URL LOADED" }, function (response) {
                        if(response.proto == "hello" && i<arr.length) loadUrls(arr,++i);
                });
            }});
        });
    });
    
    
}
   
});