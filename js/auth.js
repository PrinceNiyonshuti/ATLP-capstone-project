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
					window.location.href = "../dashboard.html";
				});
				console.log("admin");
			} else {
				swal({
					title: "Logged In",
					icon: "success",
					timer: 2000,
				}).then(() => {
					localStorage.setItem("user", JSON.stringify(user));
					window.location.href = "../userDashboard.html";
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
				window.location.href = "../dashboard.html";
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
			window.location.href = "../dashboard.html";
		} else if (subscriber != admin) {
			localStorage.setItem("user", JSON.stringify(user));
			window.location.href = "../userDashboard.html";
		} else {
			window.location.href = "../login.html";
		}
	} 
}
getProfile();
