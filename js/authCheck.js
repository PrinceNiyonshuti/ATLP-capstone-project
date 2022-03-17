/** @format */
/*
 @role check if already logged in
*/

function getProfile() {
	let user = localStorage.getItem("user");
	if (user) {
		user = JSON.parse(user);
		const role = user.role;
		const admin = "admin";
		if (role == admin) {
			localStorage.setItem("user", JSON.stringify(user));
			window.location.href = "../admin/dashboard.html";
		} else if (role != admin) {
			localStorage.setItem("user", JSON.stringify(user));
			window.location.href = "../user/userDashboard.html";
		} else {
			window.location.href = "../login.html";
		}
	}
}
getProfile();
