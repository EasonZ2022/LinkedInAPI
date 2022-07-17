const logout = document.getElementById("logout");
const saveProfile = document.getElementById("save");
const display = document.getElementById("display");

async function handleLogout() {
    chrome.storage.sync.remove(["authToken"], function() {
        location.replace("popup.html");
    })
}



// async function getCurrentTab() {
//     let queryOptions = { active: true, lastFocusedWindow: true };
//     // `tab` will either be a `tabs.Tab` instance or `undefined`.
//     let [tab] = await chrome.tabs.query(queryOptions);
//     return tab;
// }

async function displayResult() {
    // const result = results[0].result;
    // display.innerHTML = "name: "+result.name+"; location: "+result.location;
    // display.innerHTML = "skill: "+result.skill;
    chrome.storage.sync.get(["selectedFullName"], function(items) {
        display.innerHTML += items.selectedFullName.fullName+";;  "+items.selectedFullName.location+";;  ";
    });

    chrome.storage.sync.get(["selectedSkills"], function(items) {
        display.innerHTML += items.selectedSkills+";;  ";
    });     

    chrome.storage.sync.get(["selectedExperience"], function(items) {
        display.innerHTML += items.selectedExperience;
    });         

    let [tab] = await chrome.tabs.query({ active: true, currentWindow: true });
    const skillsUrl = tab.url + "details/skills/";
    const experienceUrl = tab.url + "details/experience/";

    let [skillsTab] = await chrome.tabs.query({ url: skillsUrl });
    chrome.tabs.remove(skillsTab.id);

    let [experienceTab] = await chrome.tabs.query({ url: experienceUrl });
    chrome.tabs.remove(experienceTab.id);    

}

async function handleSaveProfile() {
    // display.innerText += ":clicked";
    // 1: current page
    let [tab] = await chrome.tabs.query({ active: true, currentWindow: true });
    const skillsUrl = tab.url + "details/skills/";
    const experienceUrl = tab.url + "details/experience/";
    chrome.scripting.executeScript({
        target: { tabId: tab.id },
        files: ['get_name_location_script.js'],
    });

    // 2: /details/skills page
    chrome.tabs.create({ 
        url: skillsUrl,
        active: false
        // selected: false
    });
    let [skillsTab] = await chrome.tabs.query({ url: skillsUrl });
    chrome.scripting.executeScript({
        target: { tabId: skillsTab.id },
        files: ['get_skills_script.js'],
    },
        displayResult
    );

    // 3: /details/experience page
    chrome.tabs.create({
        url: experienceUrl,
        active: false
    });
    let [experienceTab] = await chrome.tabs.query({ url: experienceUrl });
    chrome.scripting.executeScript({
        target: { tabId: experienceTab.id },
        files: ['get_experience_script.js'],
    }
        
    );    


    // chrome.tabs.executeScript(tab.id, {
    //     code: 'document.querySelector("h1").textContent;'
    //     }, displayResult);

    // chrome.tabs.query({active: true, currentWindow: true}, function(tabs) {
    //     var tab = tabs[0];
    //     tab_title = tab.title;
    //     console.log(tab.id);
    //     chrome.tabs.executeScript(tab.id, {
    //         // code: 'document.querySelector("#ember31 div.ph5.pb5 div.mt2.relative h1").textContent'
    //         code: 'document.querySelector("h1").textContent'
    //     }, displayResult);
    // });

}

logout.addEventListener("click", handleLogout);
saveProfile.addEventListener("click", handleSaveProfile);
