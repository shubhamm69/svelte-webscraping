import { z } from 'zod';

const schema = z.object({
	name: z.string().min(3).max(50),
	year: z.number().min(2019).max(2023)
});

export const actions = {
	default: async (event) => {
		try {
			const formData = await event.request.formData();
			const name = formData.get('name');
			const year = Number(formData.get('year'));
			console.log(name, year);
			const parseData = {
				name: name,
				year: year
			};
			const validationResult = schema.safeParse(parseData);
			if (!validationResult.success) {
				return {
					success: false,
					error: validationResult.error.message,
					parseData: parseData
				};
			}
			try {
				const response = await event.fetch(`/${name}/${year}`);
				if (!response.ok) {
					throw new Error(`Failed to fetch data: ${response.status} ${response.statusText}`);
				}
				const data = await response.json();
				return {
					data: data,
					parseData: parseData
				};
			} catch (error) {
				console.error(error);
				return { error: 'Failed to fetch data' };
			}
		} catch (e) {
			return {
				success: false,
				error: 'An error occurred while processing your request.'
			};
		}
	}
};
