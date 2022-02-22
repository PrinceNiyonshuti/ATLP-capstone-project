/** @format */

async function getProfile() {
	let user = localStorage.getItem("user");
	if (!user) return (window.location.href = "./login.html");
	user = JSON.parse(user);

	document.getElementById("admin_name").innerHTML = user.email;
}
getProfile();

function logOut() {
	localStorage.clear();
	window.location.href = "./login.html";
}
