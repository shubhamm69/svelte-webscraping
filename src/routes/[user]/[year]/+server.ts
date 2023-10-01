import { json } from '@sveltejs/kit';
import { parse } from 'node-html-parser';

export async function GET({ params }) {
	const api = `https://github.com/users/${params.user}/contributions?from=${params.year}-12-01&to=${params.year}-12-31`;
	const res = await fetch(api);
	if (!res.ok) {
		throw new Error(`Failed to fetch data: ${res.status} ${res.statusText}`);
	}
	const html = await res.text();
	const dom = parse(html);
	const rows = dom.querySelectorAll('tbody > tr');
	const contributions = [];
	for (const row of rows) {
		const days = row.querySelectorAll('td:not(.ContributionCalendar-label)');
		const currentRow = [];
		for (const day of days) {
			const data = day.textContent.trim().split(' ');
			if (data.length > 1) {
				const dataLevel = day.getAttribute('data-level');
				const level = dataLevel !== undefined ? +dataLevel : 0;
				const contribution = {
					count: data[0] === 'No' ? 0 : +data[0],
					name: data[3].replace(',', ''),
					month: data[4],
					day: +data[5].replace(',', ''),
					year: data[6],
					level: level
				};
				currentRow.push(contribution);
			} else {
				currentRow.push();
			}
		}
		contributions.push(currentRow);
	}
	return json(contributions);
}
