/** @format */

async function saveArticle() {
	const title = document.getElementById("title").value;
	const author = document.getElementById("author").value;
	const slug = document.getElementById("slug").value;
	const description = document.getElementById("description").value;
	const file = document.querySelector("#cover").files[0];
	// const file = document.getElementById("cover").value;

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
			const formData = new FormData();
			formData.append('image', file);
			formData.append('title', title);
			formData.append("slug", slug);
			formData.append("author", author);
			formData.append('content', description);

			const newArticleData = await fetch(api + "articles", {
				method: "POST",
				headers: {
					authorization: token,
				},
				body:formData
			});
			response = await newArticleData.json();
			console.log(file);
			if (response.success && response.data) {
				swal({
					title: "Article Created",
					icon: "success",
					timer: 2000,
				}).then(() => {
					window.location.href = "../admin/articles.html";
				});
			} else {
				swal("Error", response.message, "error");
			}
		} catch (error) {
			swal("Error", error.message, "error");
		}
	}
}
