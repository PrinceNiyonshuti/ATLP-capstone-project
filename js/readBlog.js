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
		console.error("No article found: ", error);
	});
