/** @format */

const DataId = location.search.substring(1);

// Get article details
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

// Get All Comments Related to an Article
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

// Send a Comment
async function sendComment() {
	const content = document.getElementById("data").value;
	if (content == "") {
		swal("Error", "Please fill in the content" + content, "error");
	} else {
		try {
			const articleComment = await fetch(
				api + "articles/" + DataId + "/comment",
				{
					method: "POST",
					headers: {
						"Content-Type": "application/json",
						authorization: token,
					},
					body: JSON.stringify({
						content: content,
					}),
				}
			);
			response = await articleComment.json();
			if (articleComment.status == 201 && response.data) {
				swal({
					title: "Comment Recorded",
					icon: "success",
					timer: 2000,
				}).then(() => {
					window.location.reload();
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

setTimeout(function () {
	document.getElementById("myDiv").style.display = "none";
	document.getElementById("b-title").style.display = "block";
	document.getElementById("cover").style.display = "block";
	document.getElementById("b-descr").style.display = "block";
}, 500);

// check if authenticated and show comment box
async function getProfile() {
	let user = localStorage.getItem("user");
	user
		? ((document.getElementById("commenting-data").style.display = "block"),
		  (document.getElementById("register-data").style.display = "none"))
		: ((document.getElementById("commenting-data").style.display = "none"),
		  (document.getElementById("register-data").style.display = "block"));
}
getProfile();
