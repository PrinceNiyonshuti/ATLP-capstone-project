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
 @role register user
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
 @role save user profile
*/
function saveUserProfile({ username, email }) {
	db.collection("users")
		.doc()
		.set({
			username,
			email,
			created_at: new Date(),
		})
		.then(() => {
			swal({
				title: "Account Created",
				icon: "success",
				timer: 2000,
			}).then(() => {
				window.location.href = "../user/userDashboard.html";
			});
		})
		.catch((error) => {
			swal({
				title: "Error",
				text: ``,
				icon: "error",
				timer: 2000,
			});
		});
}

/*
 @role send query 
*/
function sendQuery() {
	const name = document.getElementById("name").value;
	const email = document.getElementById("email").value;
	const subject = document.getElementById("subject").value;
	const content = document.getElementById("content").value;
	db.collection("queries")
		.doc()
		.set({
			name,
			email,
			subject,
			content,
			created_at: new Date(),
		})
		.then(() => {
			swal({
				title: "Query sent successfully",
				icon: "success",
				timer: 2000,
			});
		})
		.catch((error) => {
			swal({
				title: "Error",
				text: `Something went wrong`,
				icon: "error",
				timer: 2000,
			});
		});
}

function subNewsletter() {
	const email = document.getElementById("subEmail").value;
	db.collection("subscribers")
		.doc()
		.set({
			email,
			created_at: new Date(),
		})
		.then(() => {
			document.getElementById("subEmail").reset();
			swal({
				title: "Subscribed to Newsletter",
				icon: "success",
				timer: 2000,
			});
		})
		.catch((error) => {
			swal({
				title: "Error",
				text: error.message,
				icon: "error",
				timer: 2000,
			});
		});
}
