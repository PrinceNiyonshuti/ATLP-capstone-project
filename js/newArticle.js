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
			formData.append("image", file);
			formData.append("title", title);
			formData.append("slug", slug);
			formData.append("author", author);
			formData.append("content", description);

			const newArticleData = await fetch(api + "articles", {
				method: "POST",
				headers: {
					authorization: token,
				},
				body: formData,
			});
			response = await newArticleData.json();
			if (response.success && response.data) {
				sendEmail(response.data._id);
			} else {
				swal("Error", response.message, "error");
			}
		} catch (error) {
			swal("Error", error.message, "error");
		}
	}
}

// notify the subscribers
function sendEmail(articleId) {
	Email.send({
		Host: "smtp.mailtrap.io",
		Username: "e42c6353918c68",
		Password: "8e25a0e98955c5",
		To: "recipient@example.com",
		From: "sender@example.com",
		Subject: "New Article Notification",
		Body:
			"<html><h2>Article Notification </h2><p>To view or read more about the new article , click here to view the article </p><strong><a href='https://prince-brand.netlify.app/readmore.html?" +
			articleId +
			"'>Read More</a></strong><br></br><small><a href='https://prince-brand.netlify.app/index.html'>NP Dev</a></small></html > ",
	}).then(() => {
		swal({
			title: "Article Created",
			icon: "success",
			timer: 2000,
		}).then(() => {
			window.location.href = "../admin/articles.html";
		});
	});
}
