let params = new URLSearchParams(window.location.search);

const email = params.get("email");
const password = params.get("password");

function login() {
	let mail = document.getElementById("email").value;
	let pass = document.getElementById("password").value;
	if (mail.length == 0 || pass.length == 0) {
		document.getElementById("error").textContent = "Fill up all fields!";
		return;
	}
	if (mail != email || password != password) {
		document.getElementById("error").textContent = "E-mail or password is incorrect! Sorry!";
		return;
	}
	document.querySelector("body").innerHTML = `
	<div id="container">
        <h1>Success!</h1>
        <div id="item">You have succesfully logged in! You got...</div>
        <div id="item">
		<iframe width="560" height="315" src="https://www.youtube.com/embed/dQw4w9WgXcQ?si=IbxFhNunYdawuc0u&amp;controls=0" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" referrerpolicy="strict-origin-when-cross-origin" allowfullscreen></iframe>
		</div>
    </div>
	`;
}
