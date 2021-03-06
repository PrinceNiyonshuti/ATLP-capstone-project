/** @format */
// get sbscribers collection
const getSubscribers = async () => {
	let result = [];
	fetch(api + "subscribers", {
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
				? (document.querySelector("#subscribers-data").innerHTML = result
						.map(
							(res) => `
							<tr>
								<td>${(counter += 1)}</td>
								<td>
									<a href="" style="text-decoration:none;color:black">
										<h4>${res?.email}</h4>
									</a>
								</td>
								<td  style="padding:0px 10px"><small style="font-weight:bold;"><p>${new Date(
									res.createdAt
								).toDateString()}</p></td>
								<td>
									<div class="button" style="justify-content: center;">
										<button class="del-btn" id="${
											res?._id
										}" onclick="unSubscriber(this.id)" style="margin:4px;">Deactivate</button>
									</div>
								</td>
							</tr>
						`
						)
						.join(""))
				: (document.querySelector(
						"#subscribers-data"
				  ).innerHTML = `<tr><td style='text-align:center' colspan='4'><h2>Sorry , No Subscribers Available</h2></td></tr>`);
		})
		.catch((err) => console.log(err));
};
getSubscribers();

function unSubscriber() {
	swal("Are you sure you want to Deactivate this Subscriber ?").then(
		(value) => {
			if (value) {
				swal("Subscriber Deactivated");
			} else {
				swal("Canceled Deactivating Subscriber");
			}
		}
	);
}
