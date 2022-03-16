/** @format */

const DataId = location.search.substring(1);

db.collection("articles")
	.doc(DataId)
	.get()
	.then((doc) => {
		let published = doc.data().created_at.toDate().toDateString();
		document.getElementById("title").innerHTML = doc.data().title;
		document.getElementById("slug").innerHTML = doc.data().slug;
		document.getElementById("author").innerHTML = doc.data().author;
		document.getElementById("published").innerHTML = published;
		document.getElementById("content").innerHTML = doc.data().description;
		document.getElementById("cover").src = doc.data().cover;
	})
	.catch((error) => {
		console.error("No article found", error);
	});
setTimeout(function () {
	document.getElementById("myDiv").style.display = "none";
	document.getElementById("b-title").style.display = "block";
	document.getElementById("cover").style.display = "block";
	document.getElementById("b-descr").style.display = "block";
}, 3500);
