/**
 * /*
 *
 * @format
 * @role register user
 */

async function addUser() {
	const email = document.getElementById("email").value;
	const password = document.getElementById("password").value;
	const username = document.getElementById("username").value;
	const role = "standard-user";

	try {
		const SignUp = await fetch(api + "auth/signup", {
			method: "POST",
			headers: {
				"Content-Type": "application/json",
			},
			body: JSON.stringify({
				username: username,
				role: role,
				email: email,
				password: password,
			}),
		});
		response = await SignUp.json();
		if (SignUp.status == 201 && response.data) {
			swal("Success", response.message, "success").then(() => {
				localStorage.setItem("token", "Bearer " + response.token);
				localStorage.setItem("user", JSON.stringify(response.data));
				if (response.data.role == "admin") {
					window.location.href = "../admin/dashboard.html";
				} else {
					window.location.href = "../user/dashboard.html";
				}
			});
		} else {
			swal("Error", response.message, "error");
		}
	} catch (error) {
		swal("Error", error.message, "error");
	}
}

/*
 @role Signin user
*/
async function loginUser() {
	const email = document.getElementById("email").value;
	const password = document.getElementById("password").value;
	try {
		const SignIn = await fetch(api + "auth/login", {
			method: "POST",
			headers: {
				"Content-Type": "application/json",
			},
			body: JSON.stringify({
				email: email,
				password: password,
			}),
		});
		response = await SignIn.json();
		if (response.status && response.data) {
			swal("Success", response.message, "success").then(() => {
				localStorage.setItem("token", "Bearer " + response.token);
				localStorage.setItem("user", JSON.stringify(response.data));
				if (response.data.role == "admin") {
					window.location.href = "../admin/dashboard.html";
				} else {
					window.location.href = "../user/dashboard.html";
				}
			});
		} else {
			swal("Error", response.message, "error");
		}
	} catch (error) {
		swal("Error", error.message, "error");
	}
}

// Check auth
function checkAuthentication() {
	let user = localStorage.getItem("user");
	if (user) {
		user = JSON.parse(user);
		const role = user.role;
		const admin = "admin";
		if (role === admin) {
			window.location.href = "../admin/dashboard.html";
		} else if (role != admin) {
			window.location.href = "../user/dashboard.html";
		} else {
		}
	} else {
		console.log("User");
	}
}
checkAuthentication();
