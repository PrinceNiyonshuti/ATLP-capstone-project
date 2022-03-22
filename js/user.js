/** @format */

// get queries collection
const getUsers = async () => {
	let result = [];
	fetch(api + "auth/list-users", {
		method: "GET",
		headers: {
			"Content-Type": "application/json",
			authorization: token,
		},
	})
		.then((response) => response.json())
		.then((json) => {
			result = json.data;
			var counter = 0;
			result?.length
				? (document.querySelector("#users-data").innerHTML = result
						.map(
							(res) => `
							<tr>
								<td>${(counter += 1)}</td>
								<td>
									<a href="" style="text-decoration:none;color:black">
										<h4>${res?.username}</h4>
									</a>
								</td>
								<td  style="padding:0px 10px">
									<p>${res?.email}</p>
								</td>
								<td  style="padding:0px 10px"><small style="font-weight:bold;"><p>${new Date(
									res.createdAt
								).toDateString()}</p></td>
								<td>
									<div class="button" style="justify-content: center;">
										<button class="del-btn" id="${
											res?._id
										}" onclick="delUser(this.id)" style="margin:4px;">Delete</button>
									</div>
								</td>
							</tr>
						`
						)
						.join(""))
				: (document.querySelector(
						"#users-data"
				  ).innerHTML = `<h1>Sorry , No User Available</h1>`);
		})
		.catch((err) => console.log(err));
};
getUsers();
