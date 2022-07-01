const form = document.getElementById("form"); 
const loading = document.getElementById("loading");
const errors = document.getElementById("errors");
const display = document.getElementById("display");

const password = document.getElementById("password");
const username = document.getElementById("username");

const url = "http://localhost:8010/proxy";

loading.style.display = "none";
display.style.display = "none";
errors.textContent = "";

async function handleSubmit(event) {
    // log.textContent = `username: ${username.value}`;
    event.preventDefault();
    loading.style.display = "block";
    errors.textContent = "";

    const data = {
        username: username.value, 
        password: password.value,
    };
    fetch(url+"/api-token-auth", {
        method: 'POST',
        body: JSON.stringify(data),
        headers: { 'Content-Type': 'application/json' },
    })
    .then(response => {
        if (!response.ok) {
            loading.style.display = "none";
            display.style.display = "none";
            // errors.textContent = JSON.stringify(response.json());
            throw Error(response.statusText);}
        return response.json();
    })
    .then(data => {
        console.log('Success:', data);
        loading.style.display = "none";
        display.textContent = `Successfully login, now we have token:${data.token}`;
        // display.textContent = `${JSON.stringify(data)}`;
        display.style.display = "block";
        chrome.storage.sync.set({ "authToken": data.token }, function(){
            console.log('authToken is set to ' + data.token);
            location.replace("account.html");
        });        
    })
    .catch((error) => {
        console.error('Error', error);
        // errors.textContent = JSON.stringify(error);
        errors.textContent = "login fails";
    });
}

form.addEventListener('submit', handleSubmit);