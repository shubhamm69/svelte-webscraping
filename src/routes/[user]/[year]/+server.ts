import { json } from '@sveltejs/kit';
import jsdom from 'jsdom';

export async function GET({ params }) {
	const api = `https://github.com/users/${params.user}/contributions?from=${params.year}-12-01&to=${params.year}-12-31`;
	const res = await fetch(api);
	if (!res.ok) {
		throw new Error(`Failed to fetch data: ${res.status} ${res.statusText}`);
	}
	const html = await res.text();
	const headers = new Headers();
	headers.set('Access-Control-Allow-Origin', '*');
	headers.set('Cache-Control', 'max-age=0, s-maxage=31536000');
	const dom = new jsdom.JSDOM(html);
	const document = dom.window.document;
	const rows = document.querySelectorAll('tbody > tr');
	const contributions = [];
	for (const row of rows) {
		const days = row.querySelectorAll('td:not(.ContributionCalendar-label)');
		const currentRow = [];
		for (const day of days) {
			const data = day.textContent.trim().split(' ');
			if (data.length > 1) {
				const contribution = {
					count: data[0] === 'No' ? 0 : +data[0],
					name: data[3].replace(',', ''),
					month: data[4],
					day: +data[5].replace(',', ''),
					year: data[6],
					level: +day.dataset.level!
				};
				currentRow.push(contribution);
			} else {
				currentRow.push;
			}
		}
		contributions.push(currentRow);
	}
	return json(contributions);
}
