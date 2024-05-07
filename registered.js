function no() {
    window.location.href = "login.html?" + params;
}

function yes() {
    alert("An error happend :( Please, try again later.");
    no();
}

var params = new URLSearchParams(window.location.search);

try {
    document.getElementById("email").textContent = params.get("email");
    document.getElementById("password").textContent = params.get("password");
}
catch (ex) {
    alert(ex);
}