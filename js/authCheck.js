/** @format */
/*
 @role check if already logged in
*/

function checkAuthUser() {
	let user = localStorage.getItem("user");
	if (user) {
		user = JSON.parse(user);
		const role = user.role;
		const standardUser = "standard-user";
		if (role === standardUser) {
			console.log("User");
		} else if (role != standardUser) {
			window.location.href = "../admin/dashboard.html";
		} else {
			window.location.href = "../login.html";
		}
	} else {
		console.log("User");
	}
}
checkAuthUser();
