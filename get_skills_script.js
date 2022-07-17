async function waitForElm(selector) {
    return new Promise(resolve => {
        if (document.querySelector(selector)) {
            return resolve(document.querySelectorAll(selector));
        }

        const observer = new MutationObserver(mutations => {
            if (document.querySelector(selector)) {
                // We only check the first match, but returns all matches
                resolve(document.querySelectorAll(selector));
                observer.disconnect();
            }
        });

        observer.observe(document.body, {
            childList: true,
            subtree: true
        });
    });
}

// The moment this script is injected, web page is not fully loaded
// So we have to wait for it
waitForElm('ul li span.mr1.t-bold span.visually-hidden').then(nodeList=>{
                console.log("elm is ready");
                let textList = [];
                for (let i = 0; i < nodeList.length; i++) {
                    console.log(nodeList[i].innerText);
                    if (!textList.includes(nodeList[i].innerText)) {
                        textList.push(nodeList[i].innerText);
                    }
                }
                chrome.storage.sync.set({ "selectedSkills": textList }, function(){
                    console.log('skills is saved to chrome storage' + textList);
                });                
            });

