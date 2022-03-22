/** @format */

// get articles collection
const getBlogs = async () => {
	let result = [];
	fetch(api + "articles", {
		method: "GET",
	})
		.then((response) => response.json())
		.then((json) => {
			result = json.data;
			result?.length
				? (document.querySelector("#blogs-data").innerHTML = result
						.map(
							(res) => `
						<div class="card">
							<img src=${res?.cover} alt="" style="height:245px" />
							<div class="panel">
								<h3>${res?.title}</h3>
								<span class="date">${new Date(res.createdAt).toDateString()}</span>
								<p>
									${res?.content.substring(0, 155)}...
								</p>
								<span class="breaker"></span>	
								<a href="/readmore.html?${res?._id}">Read more</a>
							</div>
						</div>
					`
						)
						.join(""))
				: (document.querySelector(
						"#blogs-data"
				  ).innerHTML = `<h1>Sorry , Not Article yet published</h1>`);
		})
		.catch((err) => console.log(err));
};
getBlogs();

setTimeout(function () {
	document.getElementById("myDiv").style.display = "none";
	document.getElementById("blogs-data").style.display = "flex";
}, 500);
