/** @format */

function checkAdmin() {
	let user = localStorage.getItem("user");
	if (user) {
		user = JSON.parse(user);
		const role = user.role;
		const admin = "admin";
		if (role === admin) {
			console.log("Admin");
		} else if (role != admin) {
			window.location.href = "../user/dashboard.html";
		} else {
			window.location.href = "../login.html";
		}
	} else {
		console.log("User");
	}
}
checkAdmin();
