/** @format */

async function getProfile() {
	let user = localStorage.getItem("user");
	if (!user) return (window.location.href = "./../login.html");
	user = JSON.parse(user);
	document.getElementById("admin_name").innerHTML = user.email;
	document.getElementById("user-data").innerHTML = user.username;
	document.getElementById("user-email").innerHTML = user.email;
}
getProfile();

// log out
function logOut() {
	localStorage.clear();
	window.location.href = "./../login.html";
}
