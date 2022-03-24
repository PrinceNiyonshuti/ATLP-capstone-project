/** @format */

const DataId = location.search.substring(1);
const getSingleQuery = async () => {
	let result = [];
	fetch(api + "queries/" + DataId, {
		method: "GET",
		headers: {
			"Content-Type": "application/json",
			authorization: token,
		},
	})
		.then((response) => response.json())
		.then((json) => {
			result = json.data;
			document.getElementById("senderName").innerHTML = result.name;
			document.getElementById("senderMail").innerHTML = result.email;
			document.getElementById("senderSubject").innerHTML = result.subject;
			document.getElementById("senderContent").innerHTML = result.content;
		})
		.catch((err) => console.log(err));
};
getSingleQuery();
