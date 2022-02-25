/** @format */
/*
 @role check if already logged in
*/

function getProfile() {
	let user = localStorage.getItem("user");
	if (user) {
		user = JSON.parse(user);
		const subscriber = user.email;
		const admin = "npprince47@gmail.com";
		if (subscriber == admin) {
			localStorage.setItem("user", JSON.stringify(user));
			window.location.href = "../admin/dashboard.html";
		} else if (subscriber != admin) {
			localStorage.setItem("user", JSON.stringify(user));
			window.location.href = "../user/userDashboard.html";
		} else {
			window.location.href = "../login.html";
		}
	}
}
getProfile();
