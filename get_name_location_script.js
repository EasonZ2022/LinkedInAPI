// let fullName = document.querySelector("div.ph5.pb5 div.mt2.relative div.pv-text-details__left-panel div h1").innerText;
// let place = document.querySelector("div.ph5.pb5 div.mt2.relative div.pb2.pv-text-details__left-panel span").innerText;

// fullname:
console.log(document.querySelector("div.ph5.pb5 div.mt2.relative div.pv-text-details__left-panel div h1").innerText);
// location:
console.log(document.querySelector("div.ph5.pb5 div.mt2.relative div.pb2.pv-text-details__left-panel span").innerText);

chrome.storage.sync.set({ 
    "selectedFullName": {
        fullName:document.querySelector("div.ph5.pb5 div.mt2.relative div.pv-text-details__left-panel div h1").innerText, 
        location:document.querySelector("div.ph5.pb5 div.mt2.relative div.pb2.pv-text-details__left-panel span").innerText,
    } }, 
    function(){
    console.log('fullName and location is saved to chrome storage');
});  
