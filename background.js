let color = '#3aa757';
let url = 'https://www.bilibili.com';

chrome.runtime.onInstalled.addListener(() => {
  chrome.storage.sync.set({ color });
  console.log('Default background color set to %cgreen', `color: ${color}`);
});

// function getCookie() {
//     chrome.cookies.getAll({
//         url : url
//     }, function(cookies) {
//         console.log("cookie:", cookies)
//     }

//     )
// }
