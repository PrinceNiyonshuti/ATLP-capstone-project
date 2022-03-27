/** @format */
const DataId = location.search.substring(1);
// Get All Comments Related to an Article
const getComments = async () => {
	let result = [];
	fetch(api + "articles/" + DataId + "/comment", {
		method: "GET",
	})
		.then((response) => response.json())
		.then((json) => {
			result = json.data;
			console.log(result);
			result?.length
				? (document.querySelector("#comment-data").innerHTML = result
						.map(
							(res) => `
								<div class="comment">
									<div class="comment-info">
										<div class="article-text">
											<h4 class="comment-name">${
												res?.owner["username"]
											} - <span class="comment-time">${new Date(
								res.createdAt
							).toDateString()}</span></h4>
											<p>
												${res?.content}
											</p>
										</div>
									</div>
								</div>
							`
						)
						.join(""))
				: (document.querySelector(
						"#comment-data"
				  ).innerHTML = `<h3>Sorry , Not Comments yet published</h3>`);
		})
		.catch((err) => console.log(err));
};
getComments();
