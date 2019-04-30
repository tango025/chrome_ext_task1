document.addEventListener('DOMContentLoaded', function () {
    var facebookArray = ['https://www.google.com', 'https://www.amazon.com', 'https://www.google.com'];
    var googleArray = ['https://www.yahoo.com', 'https://www.gmail.com', 'https://www.pluralsight.com'];
    var redditArray = ['https://www.freecodecamp.org/the-fastest-web-page-on-the-internet', 'https://www.quora.com/', 'http://127.0.0.1'];
    var pintrestArray = ['https://www.google.com', 'https://www.amazon.com', 'https://www.google.com'];
    var globalArray = [facebookArray,googleArray,redditArray,pintrestArray];
    $("#count1").click(()=>{
        loadUrls(globalArray,0,0);
    });

function loadUrls(arr,i,j){
    console.log(arr,i,j);
    chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
        //getting tabid
        var tab = tabs[0];
        //updatinng the tab url
        chrome.tabs.update(tab.id, { url: arr[i][j] },()=>{
            chrome.tabs.onUpdated.addListener((tabid, changedInfo) =>{
                //listener for when loading is complete
                if (changedInfo.status === "complete") {
                    console.log("complete");
                    chrome.tabs.sendMessage(tabs[0].id, { greeting:"URL LOADED" }, function (response) {
                        if (response.proto == "hello" && i < arr.length && j < arr[i].length-1){ 
                            loadUrls(globalArray, i,++j);
                            return undefined;
                        }else if(response.proto == "hello" && i < arr.length -1){
                            loadUrls(globalArray,++i,0);
                            return undefined;    
                        }else{
                            console.log("something false");
                        }
                });
            }});
        });
    });    
}
   
});