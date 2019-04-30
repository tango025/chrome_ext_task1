chrome.runtime.onMessage.addListener(
    function (request, sender, sendResponse) {
       setTimeout(()=>{one()},1000);
       setTimeout(()=>{two()},2000);
        setTimeout(() => { sendResponse({ proto: "hello" })},2000); 
    return true;
    });
var one = ()=>{
    console.log("function one");
}


var two = () => {
    console.log("function two");
}