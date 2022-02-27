/**
 * /*
 *
 * @format
 * @role send query
 */

function saveArticle() {
	const title = document.getElementById("title").value;
	const author = document.getElementById("author").value;
	const slug = document.getElementById("slug").value;
	const description = document.getElementById("description").value;

	const ref = firebase.storage().ref();
	const file = document.querySelector("#cover").files[0];
	const name = title;
	const metadata = {
		contentType: file.type,
	};
	const task = ref.child(name).put(file, metadata);
	task
		.then((snapshot) => snapshot.ref.getDownloadURL())
		.then((url) => {
			console.log(url);
			const cover = url;
			db.collection("articles")
				.doc()
				.set({
					cover,
					title,
					author,
					slug,
					description,
					created_at: new Date(),
				})
				.then(() => {
					swal({
						title: "Article Saved",
						icon: "success",
						timer: 2000,
					}).then(() => {
						window.location.href = "../admin/articles.html";
					});
				})
				.catch((error) => {
					swal({
						title: "Error",
						text: `Something went wrong`,
						icon: "error",
						timer: 2000,
					});
				});
		})
		.catch(console.error);
}

// get articles collection
db.collection("articles")
	.get()
	.then((snapshot) => {
		snapshot.docs.forEach((doc) => {
			// console.log(doc.data());
			let test = doc.id;
			html =
				"<tr data-id=" +
				doc.id +
				"><td><img src=" +
				doc.data().cover +
				"+ width='70px' height='60px' /><td>" +
				doc.data().title +
				"</td><td>" +
				doc.data().slug +
				"</td><td><div class='button' style='justify-content: center;'><a href='#' style='background-color:#1400e3;'>Edit</a>&nbsp;<button style='background-color:#f10606' onclick='delArticle()'>Delete</button></div></td></tr>";

			document.getElementById("articles-data").innerHTML += html;
		});
	});

function delArticle(id) {
	console.log(id);
}
