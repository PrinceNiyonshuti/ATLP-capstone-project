/** @format */

// get queries collection
const getQueries = async () => {
	let result = [];
	fetch(api + "queries", {
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
				? (document.querySelector("#queries-data").innerHTML = result
						.map(
							(res) => `
							<tr>
								<td>${(counter += 1)}</td>
								<td>
									<a href="" style="text-decoration:none;color:black">
										<h4>${res?.email}</h4>
									</a>
								</td>
								<td  style="padding:0px 10px"><small style="font-weight:bold;">${
									res?.subject
								}</small><p>${res?.content}</p></td>
								<td>
									<div class="button" style="justify-content: center;">
										<a href="viewQuery.html?${
											res?._id
										}" class="del-btn" style="background-color:#1400e3;">View</a>
										&nbsp;
										<button class="del-btn" id="${
											res?._id
										}" onclick="delQuery(this.id)">Delete</button>
									</div>
								</td>
							</tr>
						`
						)
						.join(""))
				: (document.querySelector(
						"#queries-data"
				  ).innerHTML = `<h1>Sorry , Not Queries yet published</h1>`);
		})
		.catch((err) => console.log(err));
};
getQueries();

// Delete Query
function delQuery(DataId) {
	swal({
		title: "Attention",
		text: "Are you sure!! You want to Delete This Query",
		icon: "warning",
		buttons: true,
		dangerMode: true,
	}).then(() => {
		willDelete(DataId);
	});
}

async function willDelete(DataId) {
	try {
		const deleteArticleData = await fetch(api + "queries/" + DataId, {
			method: "DELETE",
			headers: {
				"Content-Type": "application/json",
				authorization: token,
			},
		});
		response = await deleteArticleData.json();
		if (response.success && response.message) {
			swal({
				title: "You have Delete Query",
				icon: "success",
				timer: 2000,
			}).then(() => {
				window.location.href = "../admin/queries.html";
			});
		} else {
			swal("Error", response.message, "error");
		}
	} catch (error) {
		swal("Error", response.message, "error");
	}
}
