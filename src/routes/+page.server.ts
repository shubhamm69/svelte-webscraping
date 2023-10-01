import { z } from 'zod';

const schema = z.object({
	name: z.string().refine((value) => (value[0] === '@' ? value.slice(1) : value)),
	year: z.number().min(2019).max(2023)
});

export const actions = {
	default: async (event) => {
		try {
			const formData = await event.request.formData();
			const name = formData.get('name');
			const year = Number(formData.get('year'));
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
				const cleanedName = name ? name.toString().replace(/^@/, '') : '';
				const response = await event.fetch(`/${cleanedName}/${year}`);
				if (!response.ok) {
					throw new Error(`Failed to fetch data: ${response.status} ${response.statusText}`);
				}
				const data = await response.json();
				return {
					data: data,
					parseData: parseData
				};
			} catch (error) {
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
