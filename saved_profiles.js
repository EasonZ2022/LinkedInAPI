

const first_name = document.getElementById("first_name");
const last_name = document.getElementById("last_name");
const email = document.getElementById("email");
const username = document.getElementById("username");

let page = document.getElementById("profilesDiv");

const url = "http://localhost:8010/proxy";

async function constructAccountDetails() {
    chrome.storage.sync.get(["authToken"], function(items) {
        fetch(url+"/my-profiles", {
            method: 'GET',
            headers: { 'Content-Type': 'application/json',
                       'Authorization': 'Token '+ items.authToken },
        })
        .then(response => {
            if (!response.ok) {
                throw Error(response.statusText);}
            return response.json();
        })
        .then(profiles => {
            for (let profile of profiles) {
                let li = document.createElement("li");
                li.innerText = profile.fullname;
                let exp1 = document.createElement("div");
                let exp2 = document.createElement("div");
                let exp3 = document.createElement("div");
                // exp1.textContent = "Job title: "+profile.title1+" Company: "+profile.company1;
                exp1.append(document.createTextNode("Job title: "+profile.title1));
                exp1.append(document.createElement("br"));
                exp1.append(document.createTextNode("Company: "+profile.company1));

                exp2.append(document.createTextNode("Job title: "+profile.title2));
                exp2.append(document.createElement("br"));
                exp2.append(document.createTextNode("Company: "+profile.company2));

                exp3.append(document.createTextNode("Job title: "+profile.title3));
                exp3.append(document.createElement("br"));
                exp3.append(document.createTextNode("Company: "+profile.company3));                

                li.append(exp1);
                li.append(exp2);
                li.append(exp3);
                page.appendChild(li);
            }
        })
        .catch((error) => {
            console.error('Error', error);
            page.appendChild(document.createTextNode(error));
        });
    });
}

constructAccountDetails();