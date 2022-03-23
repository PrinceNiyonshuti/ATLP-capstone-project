/** @format */

const navMenu = document.getElementById("nav-menu"),
	navToggle = document.getElementById("nav-toggle"),
	navClose = document.getElementById("nav-close");
if (navToggle) {
	navToggle.addEventListener("click", () => {
		navMenu.classList.add("show-menu");
	});
}
if (navClose) {
	navClose.addEventListener("click", () => {
		navMenu.classList.remove("show-menu");
	});
}
const navLink = document.querySelectorAll(".nav__link");
function linkAction() {
	const navMenu = document.getElementById("nav-menu");

	navMenu.classList.remove("show-menu");
}
navLink.forEach((n) => n.addEventListener("click", linkAction));

// check if authenticated
async function getAuthData() {
	let user = localStorage.getItem("user");
	user
		? (document.getElementById("auth-data").innerHTML =
				"<a href='login.html' class='nav_link'><i class='uil uil-message nav_icon'></i> Dashboard</a>")
		: (document.getElementById("auth-data").innerHTML =
				"<a href='login.html' class='nav_link'><i class='uil uil-message nav_icon'></i> login</a>");
}
getAuthData();

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
