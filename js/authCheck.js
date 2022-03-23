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
			// do nothing 
		} else if (role != standardUser) {
			window.location.href = "../admin/dashboard.html";
		} else {
			window.location.href = "../login.html";
		}
	} else {
	
	}
}
checkAuthUser();
