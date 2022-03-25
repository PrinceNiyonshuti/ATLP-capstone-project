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
			document.getElementById("DataID").value = result._id;
			document.getElementById("title").value = result.title;
			document.getElementById("author").value = result.author;
			document.getElementById("slug").value = result.slug;
			document.getElementById("description").value = result.content;
			document.getElementById("blah").src = result.cover;
		})
		.catch((err) => console.log(err));
};
getArticle();

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
					// image: file,
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
			swal("Error", error.message, "error");
		}
	}
}
