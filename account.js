
const logout = document.getElementById("logout");

async function handleLogout() {
    chrome.storage.sync.remove(["authToken"], function() {
        location.replace("popup.html");
    })
}

logout.addEventListener("click", handleLogout);