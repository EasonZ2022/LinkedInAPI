const form = document.getElementById("form"); 
const loading = document.getElementById("loading");
const errors = document.getElementById("errors");
const display = document.getElementById("display");
const login = document.getElementById("login");

const password = document.getElementById("password");
const password2 = document.getElementById("password2");
const password_warning = document.getElementById("password_warning");
const username = document.getElementById("username");
const first_name = document.getElementById("first_name");
const last_name = document.getElementById("last_name");
const email = document.getElementById("email");
const register = document.getElementById("register");
const url = "http://localhost:8010/proxy";

loading.style.display = "none";
display.style.display = "none";
login.style.display = "none";
errors.textContent = "";
password_warning.style.display = "none";

async function handleSubmit(event) {
    // log.textContent = `username: ${username.value}`;
    event.preventDefault();
    errors.textContent = "";
    if (password2.value !== password.value) {
        password_warning.style.display = "block";
        return;
    }
    
    loading.style.display = "block";
    const data = {
        username: username.value, 
        first_name: first_name.value, 
        last_name: last_name.value,
        email: email.value, 
        password: password.value,
        password2: password2.value,
    };
    fetch(url+"/register", {
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
        display.textContent = `Successfully registered username:${data.username}`;
        // display.textContent = `${JSON.stringify(data)}`;
        display.style.display = "block";
        login.style.display = "block";
        location.replace("/login.html");
    })
    .catch((error) => {
        console.error('Error', error);
        // errors.textContent = JSON.stringify(error);
        errors.textContent = "register fails";
    });

}

form.addEventListener('submit', handleSubmit);