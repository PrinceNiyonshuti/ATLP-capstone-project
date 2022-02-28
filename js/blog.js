/** @format */

// get articles collection
db.collection("articles")
	.get()
	.then((snapshot) => {
		snapshot.docs.forEach((doc) => {
			console.log("das");
			html =
				"<div class='card'><img src=" +
				doc.data().cover +
				" alt='' style='height:245px' /><div class='panel'><h3>" +
				doc.data().title +
				"</h3><span class='date'>25th</span><p>" +
				doc.data().description.substring(0, 160) +
				" ...</p><span class='breaker'></span><a href='/readmore.html?" +
				doc.id +
				"'>Read more</a></div></div>";
			document.getElementById("blogs-data").innerHTML += html;
		});
	});
