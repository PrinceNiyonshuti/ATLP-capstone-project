/** @format */
let userMail = "";
async function getProfile() {
	let user = localStorage.getItem("user");
	if (!user) return (window.location.href = "./../login.html");
	user = JSON.parse(user);
	document.getElementById("admin_name").innerHTML = user.email;
	userMail = user.email;
}
getProfile();

// checking subscription
async function getSub() {
	let result = [];
	try {
		const subscribeToNewsletter = await fetch(
			api + "subscribers/mine/" + userMail,
			{
				method: "GET",
				headers: {
					"Content-Type": "application/json",
					authorization: token,
				},
			}
		);
		response = await subscribeToNewsletter.json();
		if (response.success && response.message) {
			document.getElementById("subscriber-data").innerHTML =
				"<div class='button' style='justify-content: left;'><button class='sub-btn' href='' onclick='unSubscribe()'>Un Subscribe</button></div>";
		} else {
			document.getElementById("subscriber-data").innerHTML =
				"<div class='button' style='justify-content: left;'><button class='sub-btn' href='' onclick='Subscribe()'>Subscribe</button></div>";
		}
	} catch (error) {}
}
getSub();

// Unsubscribe
async function unSubscribe() {
	try {
		const subscribeToNewsletter = await fetch(api + "subscribers/remove", {
			method: "POST",
			headers: {
				"Content-Type": "application/json",
				authorization: token,
			},
			body: JSON.stringify({
				email: userMail,
			}),
		});
		response = await subscribeToNewsletter.json();
		if (response.success && response.message) {
			swal({
				title: "Un Subscribed from our Newsletter",
				icon: "success",
				timer: 2000,
			}).then(() => {
				window.location.reload();
			});
		} else {
			swal("Error", response.message, "error");
		}
	} catch (error) {
		swal("Error", error.message, "error");
	}
}

// Subscriber
async function Subscribe() {
	try {
		const subscribeToNewsletter = await fetch(api + "subscribers", {
			method: "POST",
			headers: {
				"Content-Type": "application/json",
			},
			body: JSON.stringify({
				email: userMail,
			}),
		});
		response = await subscribeToNewsletter.json();
		if (subscribeToNewsletter.status == 201 && response.data) {
			swal({
				title: "Subscribed to Newsletter",
				icon: "success",
				timer: 2000,
			}).then(() => {
				window.location.reload();
			});
		} else {
			swal("Error", response.message, "error");
		}
	} catch (error) {
		swal("Error", error.message, "error");
	}
}

// log out
function logOut() {
	localStorage.clear();
	window.location.href = "./../login.html";
}
