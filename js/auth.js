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
					window.location.href = "../user/userDashboard.html";
				}
			});
		} else {
			swal("Error", response.message, "error");
		}
	} catch (error) {
		swal("Error", response.message, "error");
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
		if (SignIn.status == 200 && response.data) {
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
		swal("Error", response.message, "error");
	}
}

/*
 @role send query 
*/

async function sendQuery() {
	const name = document.getElementById("name").value;
	const email = document.getElementById("email").value;
	const subject = document.getElementById("subject").value;
	const content = document.getElementById("content").value;
	if (name == "") {
		swal("Error", "Please fill in the name", "error");
	} else if (email == "") {
		swal("Error", "Please fill in the email", "error");
	} else if (subject == "") {
		swal("Error", "Please fill in the subject", "error");
	} else if (content == "") {
		swal("Error", "Please fill in the content", "error");
	} else {
		try {
			const subscribeToNewsletter = await fetch(api + "queries", {
				method: "POST",
				headers: {
					"Content-Type": "application/json",
				},
				body: JSON.stringify({
					name: name,
					email: email,
					subject: subject,
					content: content,
				}),
			});
			response = await subscribeToNewsletter.json();
			if (subscribeToNewsletter.status == 201 && response.data) {
				swal({
					title: "Query sent successfully",
					icon: "success",
					timer: 2000,
				});
			} else {
				swal("Error", response.message, "error");
				email.value = "";
			}
		} catch (error) {
			swal("Error", response.message, "error");
		}
	}
}

/*
 @role subscribe to newsletter
*/

async function subNewsletter() {
	const email = document.getElementById("subEmail").value;
	if (email == "") {
		swal("Error", "Please fill in the email", "error");
	} else {
		try {
			const subscribeToNewsletter = await fetch(api + "subscribers", {
				method: "POST",
				headers: {
					"Content-Type": "application/json",
				},
				body: JSON.stringify({
					email: email,
				}),
			});
			response = await subscribeToNewsletter.json();
			if (subscribeToNewsletter.status == 201 && response.data) {
				swal({
					title: "Subscribed to Newsletter",
					icon: "success",
					timer: 2000,
				});
			} else {
				swal("Error", response.message, "error");
				email.value = "";
			}
		} catch (error) {
			swal("Error", response.message, "error");
		}
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
			window.location.href = "../login.html";
		}
	} else {
		console.log("User");
	}
}
checkAuthentication();
