document.addEventListener('DOMContentLoaded', function () {
    let facebookArray = ['https://www.google.com', 'https://www.amazon.com', 'https://www.google.com'];
    let googleArray = ['https://www.yahoo.com', 'https://www.gmail.com', 'https://www.pluralsight.com'];
    let redditArray = ['https://www.freecodecamp.org/the-fastest-web-page-on-the-internet', 'https://www.quora.com/', 'http://127.0.0.1'];
    let pintrestArray = ['https://www.google.com', 'https://www.amazon.com', 'https://www.google.com'];
    let globalArray = [facebookArray,googleArray,redditArray,pintrestArray];
    $("#count1").click(()=>{
        loadUrls(globalArray,0,0);
    });

function loadUrls(arr,i,j){
  
    chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
        //getting tabid
        let tab = tabs[0];
        //updatinng the tab url
        chrome.tabs.update(tab.id, { url: arr[i][j] },()=>{
            chrome.tabs.onUpdated.addListener(function listener(tabid, changedInfo){
                //listener for when loading is complete
                if (changedInfo.status === "complete" && tabid === tab.id) {
                    //remove listener once the page is loaded
                    chrome.tabs.onUpdated.removeListener(listener);
                    //sending message to the loaded URL
                    chrome.tabs.sendMessage(tabs[0].id, { greeting: "URL LOADED" }, function (response) {
                        //changing URL when both function executed
                        if (response.proto == "hello" && i < arr.length && j < arr[i].length - 1) {
                            //traversing one of the four arrays
                            loadUrls(globalArray, i, ++j);
                            return undefined;
                        } else if (response.proto == "hello" && i < arr.length - 1) {
                            //switching arrays
                            loadUrls(globalArray, ++i, 0);
                            return undefined;
                        }
                    });
            }});
        });
    });    
}
   
});

