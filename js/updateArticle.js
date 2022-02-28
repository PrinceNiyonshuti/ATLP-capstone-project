/** @format */

const DataId = location.search.substring(1);

db.collection("articles")
	.doc(DataId)
	.get()
	.then((doc) => {
		document.getElementById("DataID").value = doc.id;
		document.getElementById("title").value = doc.data().title;
		document.getElementById("author").value = doc.data().author;
		document.getElementById("slug").value = doc.data().slug;
        document.getElementById("description").value = doc.data().description;
        document.getElementById("blah").src = doc.data().cover;
	})
	.catch((error) => {
		console.error("Error removing document: ", error);
	});

function updateArticle() {
	const docId = document.getElementById("DataID").value;
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
				.doc(docId)
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
						title: "Article Updated",
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
