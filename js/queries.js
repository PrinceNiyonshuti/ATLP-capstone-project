/** @format */

// get users collection
db.collection("queries")
	.get()
	.then((snapshot) => {
		var counter = 0;
		snapshot.docs.forEach((doc) => {
			counter += 1;
			let day = doc.data().created_at;
			const joined = day.toDate().toDateString();
			html =
				"<tr  style='height:50px !important' data-id=" +
				doc.id +
				"><td>" +
				counter +
				"</td><td>" +
				doc.data().email +
				"</td><td  style='padding:0px 10px'><small style='font-weight:bold;'>" +
				doc.data().subject +
				"</small><p>" +
				doc.data().content +
				"</p></td><td><div class='button'><a href='#' style='background-color:#1400e3'>Read More</a>&nbsp;<a href='#' style='background-color:#f10606'>Delete</a></div></td></tr>";

			document.getElementById("queries-data").innerHTML += html;
		});
	});
