// const form = document.getElementById("form"); 
// const loading = document.getElementById("loading");
// const errors = document.getElementById("errors");
// const display = document.getElementById("display");

const first_name = document.getElementById("first_name");
const last_name = document.getElementById("last_name");
const email = document.getElementById("email");
const username = document.getElementById("username");

const url = "http://localhost:8010/proxy";

async function constructAccountDetails() {
    chrome.storage.sync.get(["authToken"], function(items) {
        fetch(url+"/get-details", {
            method: 'GET',
            headers: { 'Content-Type': 'application/json',
                       'Authorization': 'Token '+ items.authToken },
        })
        .then(response => {
            if (!response.ok) {
                throw Error(response.statusText);}
            return response.json();
        })
        .then(data => {
            console.log('Success:', data);
            first_name.textContent += data.first_name;
            last_name.textContent += data.last_name;
            email.textContent += data.email;
            username.textContent += data.username;
        })
        .catch((error) => {
            console.error('Error', error);
            username.textContent += error;
        });
    });
}

constructAccountDetails();