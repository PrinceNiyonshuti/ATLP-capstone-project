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
			swal({
				title: "Logged In",
				icon: "success",
				timer: 2000,
				showConfirmButton: false,
			}).then(() => {
				localStorage.setItem("user", JSON.stringify(user));
				window.location.href = "../dashboard.html";
			});
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
 @role get profile
*/
