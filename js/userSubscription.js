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

// check if subscribed
async function getAuthData() {
	let user = localStorage.getItem("user");
	user
		? (document.getElementById("subscriber-data").innerHTML =
				"<div class='button' style='justify-content: left;'><button href='' onclick='unSubscribe()'>Un Subscribe</button></div>")
		: (document.getElementById("subscriber-data").innerHTML =
				"<div class='button' style='justify-content: left;'><a href=''>Subscribe</a></div>");
}
getAuthData();


// Unsubscribe
async function unSubscribe() {
	const email = userMail;
	try {
		const subscribeToNewsletter = await fetch(api + "subscribers", {
			method: "DELETE",
			headers: {
				"Content-Type": "application/json",
				authorization: token,
			},
			body: JSON.stringify({
				email: email,
			}),
		});
		response = await subscribeToNewsletter.json();
		if (subscribeToNewsletter.status == 201 && response.data) {
			swal({
				title: "Un Subscribed from our Newsletter",
				icon: "success",
				timer: 2000,
			});
		} else {
			swal("Error", response.message, "error");
		}
	} catch (error) {
		swal("Error", response.message, "error");
	}
}


// log out
function logOut() {
	localStorage.clear();
	window.location.href = "./../login.html";
}
