/**
 * /*
 *
 * @format
 * @role Article
 */

// Update Article
async function updateArticle() {
	const docId = document.getElementById("DataID").value;
	const title = document.getElementById("title").value;
	const author = document.getElementById("author").value;
	const slug = document.getElementById("slug").value;
	const description = document.getElementById("description").value;
	const file = document.querySelector("#cover").files[0];
	if (title == "") {
		swal("Error", "Please fill in the title", "error");
	} else if (author == "") {
		swal("Error", "Please fill in the author", "error");
	} else if (slug == "") {
		swal("Error", "Please fill in the slug", "error");
	} else if (description == "") {
		swal("Error", "Please fill in the description", "error");
	} else {
		try {
			const updateArticleData = await fetch(api + "articles/" + docId, {
				method: "PUT",
				headers: {
					"Content-Type": "application/json",
					authorization: token,
				},
				body: JSON.stringify({
					image: file,
					title: title,
					slug: slug,
					author: author,
					content: description,
				}),
			});
			response = await updateArticleData.json();
			console.log(file);
			if (response.success && response.message) {
				swal({
					title: "Article Updated",
					icon: "success",
					timer: 2000,
				}).then(() => {
					window.location.href = "../admin/articles.html";
				});
			} else {
				swal("Error", response.message, "error");
			}
		} catch (error) {
			swal("Error", response.message, "error");
		}
	}
}

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
				? (document.querySelector("#articles-data").innerHTML = result
						.map(
							(res) => `
							<tr>
								<td><img src=${res?.cover} width="70px" alt="${res?.title}" /></td>
								<td>
									<a href="../readmore.html?${
										res?._id
									}" style="text-decoration:none;color:black;">
										<h4>${res?.title.substring(0, 50)} ...</h4>
									</a>
								</td>
								<td>${res?.slug}</td>
								<td>
									<div class="button" style="justify-content: center;">
										<a href="update_article.html?${
											res?._id
										}" class="del-btn" style="background-color:#1400e3;">Edit</a>
										&nbsp;
										<button class="del-btn" id="${
											res?._id
										}" onclick="delArticle(this.id)">Delete</button>
									</div>
								</td>
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
getBlogs();

// Delete Article
function delArticle(DataId) {
	swal({
		title: "Attention",
		text: "Are you sure!! You want to Delete The Article",
		icon: "warning",
	}).then((value) => {
		if (value) {
			willDelete(DataId);
		} else {
			swal("Alright then ");
		}
	});
}

async function willDelete(DataId) {
	try {
		const deleteArticleData = await fetch(api + "articles/" + DataId, {
			method: "DELETE",
			headers: {
				"Content-Type": "application/json",
				authorization: token,
			},
		});
		response = await deleteArticleData.json();
		if (response.success && response.message) {
			swal({
				title: "You have Delete Article",
				icon: "success",
				timer: 2000,
			}).then(() => {
				window.location.href = "../admin/articles.html";
			});
		} else {
			swal("Error", response.message, "error");
		}
	} catch (error) {
		swal("Error", response.message, "error");
	}
}
