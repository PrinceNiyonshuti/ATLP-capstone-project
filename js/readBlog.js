/** @format */

const DataId = location.search.substring(1);
const getArticle = async () => {
	let result = [];
	fetch(api + "articles/" + DataId, {
		method: "GET",
	})
		.then((response) => response.json())
		.then((json) => {
			result = json.data;
			let published = new Date(result.createdAt).toDateString();
			document.getElementById("title").innerHTML = result.title;
			document.getElementById("slug").innerHTML = result.slug;
			document.getElementById("author").innerHTML = result.author;
			document.getElementById("published").innerHTML = published;
			document.getElementById("comments").innerHTML = result.comments.length;
			document.getElementById("comments-data").innerHTML =
				result.comments.length;
			document.getElementById("content").innerHTML = result.content;
			document.getElementById("cover").src = result.cover;
		})
		.catch((err) => console.log(err));
};
getArticle();
const getComments = async () => {
	let result = [];
	fetch(api + "articles/" + DataId + "/comment", {
		method: "GET",
	})
		.then((response) => response.json())
		.then((json) => {
			result = json.data;
			result?.length
				? (document.querySelector("#comment-data").innerHTML = result
						.map(
							(res) => `
								<div class="comment">
									<div class="comment-info">
										<div class="article-text">
											<h4 class="comment-name">${res?.owner} - <span class="comment-time">${new Date(
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
						"#blogs-data"
				  ).innerHTML = `<h1>Sorry , Not Article yet published</h1>`);
		})
		.catch((err) => console.log(err));
};
getComments();

setTimeout(function () {
	document.getElementById("myDiv").style.display = "none";
	document.getElementById("b-title").style.display = "block";
	document.getElementById("cover").style.display = "block";
	document.getElementById("b-descr").style.display = "block";
}, 500);
