/** @format */

async function getProfile() {
	let user = localStorage.getItem("user");
	if (!user) return (window.location.href = "./../login.html");
	user = JSON.parse(user);
	document.getElementById("admin_name").innerHTML = user.email;
}
getProfile();

function logOut() {
	localStorage.clear();
	window.location.href = "./../login.html";
}

/*
 @role send query 
*/
function saveArticle() {
	const cover = document.getElementById("cover").value;
	const title = document.getElementById("title").value;
	const author = document.getElementById("author").value;
	const slug = document.getElementById("slug").value;
	const description = document.getElementById("description").value;
	// console.log(title, author, slug, description, cover);
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
}
