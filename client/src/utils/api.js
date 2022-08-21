
export async function callApi(url, method, data) {

	const res = await fetch(url, {
		method,
		headers: {
			"Content-Type": 'application/json'
		},
		credentials: 'same-origin',
		body: JSON.stringify(data),
	})

	return res.json()

}