/** @format */

// get articles collection
const getRecentArticles = async () => {
	let result = [];
	fetch(api + "articles", {
		method: "GET",
	})
		.then((response) => response.json())
		.then((json) => {
			result = json.data;
			result?.length
				? (document.querySelector("#user-articles-data").innerHTML = result
						.map(
							(res) => `
							<tr>
								<td><img src=${res?.cover}  width="70px" alt="" /></td>
								<td>
									<h4>${res?.title.substring(0, 50)} ...</h4>
								</td>
								<td>${res?.author}</td>
								<td>
									<div class="button" style="justify-content: center;">
										<a href="../readmore.html?${res?._id}">ReadMore</a>
									</div>
								</td>
							</tr>
						`
						)
						.join(""))
				: (document.querySelector(
						"#user-articles-data"
				  ).innerHTML = `<h1>Sorry , Not Article yet published</h1>`);
		})
		.catch((err) => console.log(err));
};
getRecentArticles();

async function getProfile() {
	let user = localStorage.getItem("user");
	if (!user) return (window.location.href = "./../login.html");
	user = JSON.parse(user);
	document.getElementById("admin_name").innerHTML = user.email;
	document.getElementById("user-data").innerHTML = user.username;
}
getProfile();


// log out
function logOut() {
	localStorage.clear();
	window.location.href = "./../login.html";
}
