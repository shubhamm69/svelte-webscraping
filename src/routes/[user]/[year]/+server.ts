// src/routes/api/[user]/[year].js
export async function GET({ params }) {
	const api = `https://github.com/users/${params.user}/contributions?from=${params.year}-12-01&to=${params.year}-12-31`;
	const res = await fetch(api);

	if (!res.ok) {
		throw new Error(`Failed to fetch data: ${res.status} ${res.statusText}`);
	}

	const html = await res.text();

	// Convert the HTML content to a Blob and create a ReadableStream from it
	const blob = new Blob([html], { type: 'text/html' });
	const body = blob.stream();

	// Create Headers and set the Content-Type header
	const headers = new Headers();
	headers.set('Content-Type', 'text/html');

	// Create a Response instance
	const response = new Response(body, {
		headers: headers,
		status: 200, // Set the appropriate status code here
		statusText: 'OK' // Set the appropriate status text here
	});

	return response;
}
