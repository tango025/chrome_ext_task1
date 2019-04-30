chrome.runtime.onMessage.addListener(
    function (request, sender, sendResponse) {
       one();
       two();
        sendResponse({ proto: "hello" });
    }
);
var one = ()=>{
    console.log("function one");
}


var two = () => {
    console.log("function two");
}