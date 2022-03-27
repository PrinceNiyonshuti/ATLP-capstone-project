/** @format */
const DataId = location.search.substring(1);
// Get All Comments Related to an Article
const getComments = async () => {
	let result = [];
	fetch(api + "articles/" + DataId + "/comment", {
		method: "GET",
	})
		.then((response) => response.json())
		.then((json) => {
            result = json.data;
            var counter = 0;
			result?.length
				? (document.querySelector("#comment-data").innerHTML = result
						.map(
							(res) => `
                                <tr>
                                    <td>${(counter += 1)}</td>
                                    <td>
                                        <a href="" style="text-decoration:none;color:black">
                                            <h4>${res?.owner["username"]}</h4>
                                        </a>
                                    </td>
                                    <td  style="padding:0px 10px"><small style="font-weight:bold;">${new Date(
																			res.createdAt
																		).toDateString()}</small>
                                        <p>${res?.content}</p>
                                    </td>
                                    <td>
                                        <div class="button" style="justify-content: center;">
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
						"#comment-data"
				  ).innerHTML = `<tr><td style='text-align:center' colspan='4'><h1>Sorry , No Comments yet published</h1></td></tr>`);
		})
		.catch((err) => console.log(err));
};
getComments();
