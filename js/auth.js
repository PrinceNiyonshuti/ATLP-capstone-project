/**
 * /*
 *
 * @format
 * @role register user
 */

function addUser() {
	const email = document.getElementById("email").value;
	const password = document.getElementById("password").value;
	const username = document.getElementById("username").value;
	auth
		.createUserWithEmailAndPassword(email, password)
		.then((userCredential) => {
			const user = userCredential.user;
			localStorage.setItem("user", JSON.stringify(user));
			saveUserProfile({ username, email });
		})
		.catch((error) => {
			const errorCode = error.code;
			const errorMessage = error.message;
			swal({
				title: "Invalid Credentials",
				text: errorMessage,
				icon: "error",
				timer: 2000,
			});
		});
}
/*
 @role register user
*/
function loginUser() {
	const email = document.getElementById("email").value;
	const password = document.getElementById("password").value;
	auth
		.signInWithEmailAndPassword(email, password)
		.then((userCredential) => {
			const user = userCredential.user;
			console.log(user.email);
			const subscriber = user.email;
			const admin = "npprince47@gmail.com";
			if (subscriber == admin) {
				swal({
					title: "Logged In Admin",
					icon: "success",
					timer: 2000,
				}).then(() => {
					localStorage.setItem("user", JSON.stringify(user));
					window.location.href = "../admin/dashboard.html";
				});
				console.log("admin");
			} else {
				swal({
					title: "Logged In",
					icon: "success",
					timer: 2000,
				}).then(() => {
					localStorage.setItem("user", JSON.stringify(user));
					window.location.href = "../user/userDashboard.html";
				});
				console.log("user");
			}
		})
		.catch((error) => {
			const errorCode = error.code;
			const errorMessage = error?.message;
			swal({
				title: "Invalid Credentials",
				text: ``,
				icon: "error",
				timer: 2000,
			});
		});
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
