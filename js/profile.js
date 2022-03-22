/** @format */

// get my profile
const getMyProfile = async () => {
	let result = [];
	fetch(api + "auth/user-profile", {
		method: "GET",
		headers: {
			"Content-Type": "application/json",
			authorization: token,
		},
	})
		.then((response) => response.json())
		.then((json) => {
			result = json.data;
			document.getElementById("user-username").innerHTML = result.username;
			document.getElementById("user-mail").innerHTML = result.email;
		})
		.catch((err) => console.log(err));
};
getMyProfile();
