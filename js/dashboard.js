/** @format */

async function getProfile() {
	let user = localStorage.getItem("user");
	if (!user) return (window.location.href = "./../login.html");
	user = JSON.parse(user);
	document.getElementById("admin_name").innerHTML = user.email;
	document.getElementById("user-data").innerHTML = user.username;
}
getProfile();

function logOut() {
	localStorage.clear();
	window.location.href = "./../login.html";
}

// get articles collection
const getArticles = async () => {
	let result = [];
	fetch(api + "articles", {
		method: "GET",
	})
		.then((response) => response.json())
		.then((json) => {
			result = json.data;
			result?.length
				? (document.querySelector("#articles-data").innerHTML = result
						.map(
							(res) => `
								<tr>
									<td><img src=${res?.cover} width="70px" alt="${res?.title}" /></td>
									<td><a href="../readmore.html?${
										res?._id
									}" style="color:black;text-decoration:none">${res?.title.substring(
								0,
								15
							)} ...</a></td>
									<td>${res?.comments.length} Comments</td>
								</tr>
						`
						)
						.join(""))
				: (document.querySelector(
						"#articles-data"
				  ).innerHTML = `<h1>Sorry , Not Article yet published</h1>`);
		})
		.catch((err) => console.log(err));
};
getArticles();

// get queries collection
const getDashQueries = async () => {
	let result = [];
	fetch(api + "queries", {
		method: "GET",
		headers: {
			"Content-Type": "application/json",
			authorization: token,
		},
	})
		.then((response) => response.json())
		.then((json) => {
			result = json.data;
			var counter = 0;
			result?.length
				? (document.querySelector("#queries-data").innerHTML = result
						.map(
							(res) => `
							<a href="queries.html">
								<div class="center">
									<p>${(counter += 1)}</p>
								</div>
								<div class="query_data">
									<span class="query_title"><b>${res?.name}</b></span>
									<p class="query_tag">i want to know more about...</p>
								</div>
							</a>
						`
						)
						.join(""))
				: (document.querySelector(
						"#queries-data"
				  ).innerHTML = `<h1>Sorry , Not Queries yet published</h1>`);
		})
		.catch((err) => console.log(err));
};
getDashQueries();
